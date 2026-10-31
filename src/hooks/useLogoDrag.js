import { useState } from 'react';

// Перетягування мишкою на Canvas з автоматичним магнітом до найближчої вільної контрольної точки
export function useLogoDrag({
  logos,
  setLogos,
  setSelectedLogoId,
  svgContainerRef,
  geometry,
  selectedPiece,
  pieceControlPoints,
}) {
  const [draggingLogoId, setDraggingLogoId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { sheetW, sheetH, pX, pY, pxPerCm } = geometry;

  const mouseToCm = (e) => {
    const rect = svgContainerRef.current?.querySelector('svg')?.getBoundingClientRect();
    if (!rect) return null;
    const mouseSvgX = (e.clientX - rect.left) * (sheetW / rect.width);
    const mouseSvgY = (e.clientY - rect.top) * (sheetH / rect.height);
    return { x: (mouseSvgX - pX) / pxPerCm, y: (mouseSvgY - pY) / pxPerCm };
  };

  const handleMouseDown = (e, logo) => {
    e.stopPropagation();
    setSelectedLogoId(logo.id);
    setDraggingLogoId(logo.id);

    const mouse = mouseToCm(e);
    if (!mouse) return;
    setDragOffset({ x: mouse.x - logo.positionX, y: mouse.y - logo.positionY });
  };

  const handleMouseMove = (e) => {
    if (!draggingLogoId) return;
    const mouse = mouseToCm(e);
    if (!mouse) return;

    const newX = Math.round((mouse.x - dragOffset.x) * 10) / 10;
    const newY = Math.round((mouse.y - dragOffset.y) * 10) / 10;

    setLogos((prev) =>
      prev.map((l) => (l.id === draggingLogoId ? { ...l, positionX: newX, positionY: newY } : l))
    );
  };

  const handleMouseUp = () => {
    if (!draggingLogoId) return;

    // При відпусканні мишки: знаходимо найближчу ВІЛЬНУ контрольну точку,
    // масштабуємо і вирівнюємо логотип згідно футбольних стандартів
    const targetLogo = logos.find((l) => l.id === draggingLogoId);
    if (targetLogo) {
      const occupiedCodes = logos
        .filter((l) => l.pieceType === selectedPiece && l.id !== draggingLogoId)
        .map((l) => l.controlPointCode);

      const freeCPs = pieceControlPoints.filter((cp) => !occupiedCodes.includes(cp.code));
      const closestCP =
        freeCPs.length > 0
          ? freeCPs.reduce((closest, cp) => {
              const d1 = Math.hypot(targetLogo.positionX - cp.defaultX, targetLogo.positionY - cp.defaultY);
              const d2 = Math.hypot(targetLogo.positionX - closest.defaultX, targetLogo.positionY - closest.defaultY);
              return d1 < d2 ? cp : closest;
            }, freeCPs[0])
          : pieceControlPoints.find((cp) => cp.code === targetLogo.controlPointCode);

      if (closestCP) {
        setLogos((prev) =>
          prev.map((l) =>
            l.id === draggingLogoId
              ? {
                  ...l,
                  controlPointCode: closestCP.code,
                  anchorPointCode: closestCP.code,
                  positionX: closestCP.defaultX,
                  positionY: closestCP.defaultY,
                  width: closestCP.standardW,
                  height: closestCP.standardH,
                  centerHorizontally: closestCP.centerHorizontally,
                  isLocked: true,
                }
              : l
          )
        );
      }
    }

    setDraggingLogoId(null);
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
}
