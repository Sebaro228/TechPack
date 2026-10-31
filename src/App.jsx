import { useState, useEffect, useRef } from 'react';
import './App.css';
import { FOOTBALL_CONTROL_POINTS, FOOTBALL_KIT_PRESETS, GRADING_RULES } from './presets';
import { EMPTY_KIT_ID, DEFAULT_KIT_NAME } from './constants';
import { getSheetGeometry, round1 } from './utils/geometry';
import { calculateDistances, generateGradingTable } from './utils/calculations';
import { readLogoFile, makeId } from './utils/logoFiles';
import { downloadSvgAsPdf } from './utils/pdf';
import { useLogoDrag } from './hooks/useLogoDrag';

import Header from './components/Header';
import PieceSelector from './components/PieceSelector';
import KitPresets from './components/KitPresets';
import LogoUploader from './components/LogoUploader';
import LogoList from './components/LogoList';
import LogoInspector from './components/LogoInspector';
import CanvasToolbar from './components/CanvasToolbar';
import TechPackCanvas from './components/TechPackCanvas';
import GradingTable from './components/GradingTable';

export default function App() {
  // Стан виробу
  const [selectedPiece, setSelectedPiece] = useState('front'); // 'front' | 'back' | 'sleeve'
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedKitId, setSelectedKitId] = useState('ukraine_national');
  const [kitName, setKitName] = useState(DEFAULT_KIT_NAME);

  // Розміри базового лекала в см
  const [pieceDimensions] = useState({
    front: { width: 50.0, height: 70.0 },
    back: { width: 50.0, height: 72.0 },
    sleeve: { width: 36.0, height: 24.0 },
  });

  // Налаштування персоналізації гравця
  const [playerName, setPlayerName] = useState('ZINCHENKO');
  const [playerNumber, setPlayerNumber] = useState('17');
  const [jerseyColor, setJerseyColor] = useState('#ffd700');

  // Список усіх розміщених логотипів
  const [logos, setLogos] = useState([]);
  const [selectedLogoId, setSelectedLogoId] = useState(null);

  // Прапорці відображення
  const [showDimensions, setShowDimensions] = useState(true);
  const [showSeamAllowances, setShowSeamAllowances] = useState(true);
  const [showCalibrationSquare] = useState(true);

  const fileInputRef = useRef(null);
  const batchFileInputRef = useRef(null);
  const svgContainerRef = useRef(null);

  // Масштаб для поточного розміру
  const currentRule = GRADING_RULES.find((r) => r.size.startsWith(selectedSize)) || GRADING_RULES[3];
  const sizeScale = currentRule.scale;

  // Габарити активної деталі
  const curPieceW = pieceDimensions[selectedPiece].width;
  const curPieceH = pieceDimensions[selectedPiece].height;
  const effectiveW = round1(curPieceW * sizeScale);
  const effectiveH = round1(curPieceH * sizeScale);
  const geometry = getSheetGeometry(effectiveW, effectiveH);

  // Контрольні точки поточної сторони
  const pieceControlPoints = FOOTBALL_CONTROL_POINTS[selectedPiece] || [];
  const maxControlPoints = pieceControlPoints.length;
  const currentPieceLogos = logos.filter((l) => l.pieceType === selectedPiece);
  const isFull = currentPieceLogos.length >= maxControlPoints;

  // Активний логотип
  const activeLogo = logos.find((l) => l.id === selectedLogoId) || currentPieceLogos[0] || null;
  const distances = calculateDistances({
    logo: activeLogo,
    piece: selectedPiece,
    sizeScale,
    effectiveW,
    effectiveH,
    controlPoints: pieceControlPoints,
  });
  const gradingRows = generateGradingTable({
    pieceW: curPieceW,
    pieceH: curPieceH,
    pieceLogos: currentPieceLogos,
  });

  const drag = useLogoDrag({
    logos,
    setLogos,
    setSelectedLogoId,
    svgContainerRef,
    geometry,
    selectedPiece,
    pieceControlPoints,
  });

  // ---------- Комплекти ----------

  // Застосування готового комплекту (12 логотипів на 3 сторонах)
  const applyKitPreset = (kit) => {
    setSelectedKitId(kit.id);

    const newLogos = Object.entries(kit.slots).map(([slotKey, slotData]) => {
      const cp = (FOOTBALL_CONTROL_POINTS[slotData.pieceType] || []).find(
        (p) => p.code === slotData.controlPointCode
      );

      return {
        id: makeId(`kit_${slotKey}`),
        slotKey,
        name: slotData.name,
        type: slotData.type,
        width: cp?.standardW || 7.5,
        height: cp?.standardH || 7.5,
        positionX: cp?.defaultX || 25.0,
        positionY: cp?.defaultY || 15.0,
        centerHorizontally: cp?.centerHorizontally || false,
        controlPointCode: slotData.controlPointCode,
        anchorPointCode: slotData.controlPointCode,
        pieceType: slotData.pieceType,
        svg: slotData.svg || null,
        imageUrl: slotData.imageUrl || null,
        textContent:
          slotData.textContent ||
          (slotData.type === 'number' ? playerNumber : slotData.type === 'name' ? playerName : null),
        color: slotData.color || jerseyColor,
        isLocked: true, // незмінні офіційні відстані
        isVisible: true,
      };
    });

    setLogos(newLogos);
    setSelectedLogoId(newLogos.find((l) => l.pieceType === selectedPiece)?.id ?? null);
  };

  // Новий комплект: початково порожній, логотипи додаються з файлів
  const createEmptyKit = () => {
    if (selectedKitId === EMPTY_KIT_ID && logos.length === 0) return;
    if (logos.length > 0 && !window.confirm('Створити новий порожній комплект? Поточні логотипи буде прибрано з макета.')) {
      return;
    }
    setSelectedKitId(EMPTY_KIT_ID);
    setKitName(DEFAULT_KIT_NAME);
    setLogos([]);
    setSelectedLogoId(null);
  };

  // Ініціалізація першого готового комплекту
  useEffect(() => {
    applyKitPreset(FOOTBALL_KIT_PRESETS[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Персоналізація ----------

  const handlePlayerNameChange = (val) => {
    setPlayerName(val);
    setLogos((prev) => prev.map((l) => (l.type === 'name' ? { ...l, textContent: val.toUpperCase() } : l)));
  };

  const handlePlayerNumberChange = (val) => {
    setPlayerNumber(val);
    setLogos((prev) => prev.map((l) => (l.type === 'number' ? { ...l, textContent: val } : l)));
  };

  const handleJerseyColorChange = (val) => {
    setJerseyColor(val);
    setLogos((prev) =>
      prev.map((l) => (l.type === 'number' || l.type === 'name' ? { ...l, color: val } : l))
    );
  };

  // ---------- Логотипи ----------

  // Накидання набору файлів логотипів (Batch Dropper)
  const handleBatchFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;

    const availableSlots = maxControlPoints - currentPieceLogos.length;
    if (availableSlots <= 0) {
      alert(`Всі ${maxControlPoints} контрольних точок на цій деталі форми вже зайняті. Видаліть зайві логотипи, щоб додати нові.`);
      return;
    }

    if (files.length > availableSlots) {
      alert(`Увага: вибрано ${files.length} файлів, але доступно лише ${availableSlots} вільних контрольних точок. Перші ${availableSlots} будуть завантажені.`);
    }

    const piece = selectedPiece;
    const controlPoints = pieceControlPoints;

    files.slice(0, availableSlots).forEach(async (file) => {
      const loaded = await readLogoFile(file);

      setLogos((prev) => {
        const occupied = prev.filter((l) => l.pieceType === piece).map((l) => l.controlPointCode);
        const freeCP = controlPoints.find((cp) => !occupied.includes(cp.code));
        if (!freeCP) return prev;

        return [
          ...prev,
          {
            id: makeId('logo'),
            ...loaded,
            width: freeCP.standardW,
            height: freeCP.standardH,
            positionX: freeCP.defaultX,
            positionY: freeCP.defaultY,
            centerHorizontally: freeCP.centerHorizontally,
            controlPointCode: freeCP.code,
            anchorPointCode: freeCP.code,
            pieceType: piece,
            type: freeCP.defaultType,
            isLocked: true,
            isVisible: true,
          },
        ];
      });
    });
  };

  // Заміна файлу активного логотипа
  const handleReplaceLogoFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !activeLogo) return;

    const targetId = activeLogo.id;
    const loaded = await readLogoFile(file);
    setLogos((prev) => prev.map((l) => (l.id === targetId ? { ...l, ...loaded } : l)));
  };

  // Видалення логотипа (звільняє контрольну точку)
  const handleDeleteLogo = (id) => {
    const nextLogos = logos.filter((l) => l.id !== id);
    setLogos(nextLogos);
    if (selectedLogoId === id) {
      setSelectedLogoId(nextLogos.find((l) => l.pieceType === selectedPiece)?.id || null);
    }
  };

  // ---------- Експорт ----------

  const handleDownloadPdf = () =>
    downloadSvgAsPdf(svgContainerRef.current?.querySelector('svg'), {
      width: geometry.sheetW,
      height: geometry.sheetH,
      filename: `FootballKit_TechPack_${selectedPiece}_${selectedSize}.pdf`,
    });

  return (
    <div className="app-container">
      <Header onDownloadPdf={handleDownloadPdf} onPrint={() => window.print()} />

      <div className="main-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          <PieceSelector
            selectedPiece={selectedPiece}
            onSelectPiece={setSelectedPiece}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            filledCount={currentPieceLogos.length}
            maxCount={maxControlPoints}
            isFull={isFull}
          />

          <KitPresets
            selectedKitId={selectedKitId}
            kitName={kitName}
            onKitNameChange={setKitName}
            onApplyPreset={applyKitPreset}
            onCreateEmptyKit={createEmptyKit}
            personalization={{
              playerName,
              playerNumber,
              jerseyColor,
              onNameChange: handlePlayerNameChange,
              onNumberChange: handlePlayerNumberChange,
              onColorChange: handleJerseyColorChange,
            }}
          />

          <div className="card">
            <LogoUploader
              inputRef={batchFileInputRef}
              freeCount={maxControlPoints - currentPieceLogos.length}
              maxCount={maxControlPoints}
              isFull={isFull}
              onFiles={handleBatchFileUpload}
            />
            <LogoList
              logos={currentPieceLogos}
              controlPoints={pieceControlPoints}
              maxCount={maxControlPoints}
              selectedLogoId={selectedLogoId}
              onSelect={setSelectedLogoId}
              onDelete={handleDeleteLogo}
            />
          </div>

          {activeLogo && distances && (
            <LogoInspector
              logo={activeLogo}
              distances={distances}
              selectedSize={selectedSize}
              inputRef={fileInputRef}
              onReplaceFile={handleReplaceLogoFile}
            />
          )}
        </div>

        {/* Right Canvas / Preview */}
        <div className="preview-container">
          <div className="canvas-card">
            <CanvasToolbar
              selectedSize={selectedSize}
              selectedPiece={selectedPiece}
              effectiveW={effectiveW}
              effectiveH={effectiveH}
              sizeScale={sizeScale}
              showDimensions={showDimensions}
              showSeamAllowances={showSeamAllowances}
              onToggleDimensions={() => setShowDimensions((v) => !v)}
              onToggleSeamAllowances={() => setShowSeamAllowances((v) => !v)}
            />

            <div className="canvas-wrapper" ref={svgContainerRef}>
              <TechPackCanvas
                geometry={geometry}
                selectedPiece={selectedPiece}
                selectedSize={selectedSize}
                sizeScale={sizeScale}
                effectiveW={effectiveW}
                effectiveH={effectiveH}
                controlPoints={pieceControlPoints}
                pieceLogos={currentPieceLogos}
                selectedLogoId={selectedLogoId}
                jerseyColor={jerseyColor}
                showDimensions={showDimensions}
                showSeamAllowances={showSeamAllowances}
                showCalibrationSquare={showCalibrationSquare}
                onLogoMouseDown={drag.handleMouseDown}
                onMouseMove={drag.handleMouseMove}
                onMouseUp={drag.handleMouseUp}
                onFreePointClick={() => batchFileInputRef.current?.click()}
              />
            </div>
          </div>

          <GradingTable rows={gradingRows} selectedSize={selectedSize} />
        </div>
      </div>
    </div>
  );
}
