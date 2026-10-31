import { getNeckPoint } from '../utils/calculations';
import { getPieceLabel, renderContourPath, round1 } from '../utils/geometry';
import LogoShape from './LogoShape';
import DimensionArrows from './DimensionArrows';
import CalibrationBlock from './CalibrationBlock';

const ArrowMarker = ({ id, color, start }) => (
  <marker
    id={id}
    viewBox="0 0 10 10"
    refX="5"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient={start ? 'auto-start-reverse' : 'auto'}
  >
    <path d="M 0 1 L 10 5 L 0 9 z" fill={color} />
  </marker>
);

// Клієнтський інтерактивний векторний SVG макет
export default function TechPackCanvas({
  geometry,
  selectedPiece,
  selectedSize,
  sizeScale,
  effectiveW,
  effectiveH,
  controlPoints,
  pieceLogos,
  selectedLogoId,
  jerseyColor,
  designFill,
  showDimensions,
  showSeamAllowances,
  showCalibrationSquare,
  onLogoMouseDown,
  onMouseMove,
  onMouseUp,
  onFreePointClick,
}) {
  const { sheetW, sheetH, pW, pH, pX, pY, centerX, pxPerCm } = geometry;
  const neckPoint = getNeckPoint(selectedPiece);
  const neckPxY = pY + neckPoint.y * sizeScale * pxPerCm;
  const contourPath = renderContourPath(selectedPiece, pW, pH, pX, pY, sizeScale);
  const clipPathId = `piece-clip-${selectedPiece}`;
  const fillScale = (designFill?.scale || 100) / 100;
  const fillX = pX + ((designFill?.offsetX || 0) / 100) * pW;
  const fillY = pY + ((designFill?.offsetY || 0) / 100) * pH;

  return (
    <svg
      className="canvas-svg"
      viewBox={`0 0 ${sheetW} ${sheetH}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <defs>
        <ArrowMarker id="arr-end-red" color="#dc2626" />
        <ArrowMarker id="arr-start-red" color="#dc2626" start />
        <ArrowMarker id="arr-end-blue" color="#2563eb" />
        <ArrowMarker id="arr-start-blue" color="#2563eb" start />
        <clipPath id={clipPathId}>
          <path d={contourPath} />
        </clipPath>
      </defs>

      {/* Штамп креслення */}
      <rect x="25" y="15" width={sheetW - 50} height="74" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="40" y="41" fontSize="16" fontWeight="bold" fill="#0f172a">
        ТЕХНОЛОГІЧНА КАРТА РОЗМІЩЕННЯ ПРИНТІВ (ТКШВ)
      </text>
      <text x="40" y="65" fontSize="12" fill="#475569">
        Деталь: <b>{getPieceLabel(selectedPiece)}</b> | Лекало: <b>{effectiveW} × {effectiveH} см</b> | Масштаб: <b>×{sizeScale}</b>
      </text>

      {/* Бейдж розміру */}
      <rect x={sheetW - 130} y="23" width="105" height="58" rx="6" fill="#1e3a8a" />
      <text x={sheetW - 77.5} y="44" fontSize="11" fontWeight="600" fill="#93c5fd" textAnchor="middle">
        РОЗМІР
      </text>
      <text x={sheetW - 77.5} y="69" fontSize="24" fontWeight="900" fill="#ffffff" textAnchor="middle">
        {selectedSize}
      </text>

      {/* Дизайн обрізається точно по векторному контуру деталі. */}
      {designFill?.dataUrl && (
        <g clipPath={`url(#${clipPathId})`} pointerEvents="none">
          <image
            href={designFill.dataUrl}
            x={fillX}
            y={fillY}
            width={pW * fillScale}
            height={pH * fillScale}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      )}

      {/* Контур деталі крою */}
      <path d={contourPath} fill={designFill?.dataUrl ? "none" : "#ffffff"} stroke="#334155" strokeWidth="2.5" />

      {/* Припуски на шви 3-5 мм (пунктир) */}
      {showSeamAllowances && (
        <path
          d={renderContourPath(selectedPiece, pW - 10, pH - 10, pX + 5, pY + 5, sizeScale)}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      )}

      {/* Осьова лінія симетрії */}
      <line x1={centerX} y1={pY} x2={centerX} y2={pY + pH} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6,6" />

      {/* Офіційні цільові контрольні точки */}
      {controlPoints.map((cp) => {
        const isOccupied = pieceLogos.some((l) => l.controlPointCode === cp.code);
        const cx = cp.centerHorizontally ? centerX : pX + cp.defaultX * sizeScale * pxPerCm;
        const cy = pY + cp.defaultY * sizeScale * pxPerCm;

        return (
          <g key={cp.code}>
            {!isOccupied && (
              <g style={{ cursor: 'pointer', opacity: 0.45 }} onClick={onFreePointClick}>
                <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="#3b82f6" strokeWidth="1.5" />
                <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#3b82f6" strokeWidth="1.5" />
                <text x={cx + 10} y={cy + 4} fontSize="8" fontWeight="600" fill="#3b82f6">
                  {cp.name}
                </text>
              </g>
            )}
            {isOccupied && <circle cx={cx} cy={cy} r="3" fill="#16a34a" stroke="#ffffff" strokeWidth="1" />}
          </g>
        );
      })}

      {/* Розміщені логотипи */}
      {pieceLogos.map((logo) => {
        if (!logo.isVisible) return null;

        const scaledW = round1(logo.width * sizeScale);
        const scaledH = round1(logo.height * sizeScale);
        const logoX = logo.centerHorizontally ? (effectiveW - scaledW) / 2 : logo.positionX * sizeScale;
        const logoY = logo.positionY * sizeScale;

        const px = {
          x: pX + logoX * pxPerCm,
          y: pY + logoY * pxPerCm,
          w: scaledW * pxPerCm,
          h: scaledH * pxPerCm,
        };
        const isSelected = selectedLogoId === logo.id;

        return (
          <g key={logo.id} style={{ cursor: 'grab' }} onMouseDown={(e) => onLogoMouseDown(e, logo)}>
            <LogoShape logo={logo} {...px} isSelected={isSelected} fallbackColor={jerseyColor} />
            {showDimensions && isSelected && (
              <DimensionArrows
                logo={logo}
                logoPx={px}
                logoX={logoX}
                logoY={logoY}
                scaledW={scaledW}
                neckPxY={neckPxY}
                neckCm={neckPoint.y}
                sizeScale={sizeScale}
                centerX={centerX}
                pX={pX}
              />
            )}
          </g>
        );
      })}

      {showCalibrationSquare && (
        <CalibrationBlock pY={pY} pH={pH} sheetW={sheetW} selectedSize={selectedSize} />
      )}
    </svg>
  );
}
