import { useRef, useState } from 'react';

const round1 = (value) => Math.round(value * 10) / 10;

// Перетягування точок розміщення без зміни базового пресету.
export function useControlPointDrag({
  svgContainerRef,
  geometry,
  selectedPiece,
  sizeScale,
  pieceDimensions,
  setControlPointOverrides,
  setLogos,
  onControlPointClick,
}) {
  const [draggingControlPoint, setDraggingControlPoint] = useState(null);
  const dragSessionRef = useRef(null);
  const { sheetW, sheetH, pX, pY, pxPerCm } = geometry;

  const mouseToBaseCm = (event) => {
    const svg = svgContainerRef.current?.querySelector('svg');
    const rect = svg?.getBoundingClientRect();
    if (!rect) return null;

    const svgX = (event.clientX - rect.left) * (sheetW / rect.width);
    const svgY = (event.clientY - rect.top) * (sheetH / rect.height);
    const dimensions = pieceDimensions[selectedPiece];
    if (!dimensions) return null;

    const x = (svgX - pX) / pxPerCm / sizeScale;
    const y = (svgY - pY) / pxPerCm / sizeScale;
    return {
      x: Math.min(dimensions.width, Math.max(0, round1(x))),
      y: Math.min(dimensions.height, Math.max(0, round1(y))),
    };
  };

  const handleMouseDown = (event, controlPoint) => {
    event.preventDefault();
    event.stopPropagation();
    dragSessionRef.current = {
      piece: selectedPiece,
      code: controlPoint.code,
      startX: event.clientX,
      startY: event.clientY,
      hasMoved: false,
      axisLockedToCenter: controlPoint.axisLockedToCenter,
    };
  };

  const handleMouseMove = (event) => {
    const dragSession = dragSessionRef.current;
    if (!dragSession) return;
    const distance = Math.hypot(event.clientX - dragSession.startX, event.clientY - dragSession.startY);
    if (!dragSession.hasMoved && distance < 5) return;
    dragSession.hasMoved = true;
    setDraggingControlPoint(dragSession);

    const position = mouseToBaseCm(event);
    if (!position) return;

    const dimensions = pieceDimensions[dragSession.piece];
    const centerLocked = dragSession.axisLockedToCenter;
    setControlPointOverrides((previous) => ({
      ...previous,
      [dragSession.piece]: {
        ...previous[dragSession.piece],
        [dragSession.code]: {
          defaultX: centerLocked ? dimensions.width / 2 : position.x,
          defaultY: position.y,
          centerHorizontally: centerLocked,
        },
      },
    }));
    setLogos((previous) =>
      previous.map((logo) =>
        logo.pieceType === dragSession.piece && logo.controlPointCode === dragSession.code
          ? {
              ...logo,
              positionX: centerLocked ? dimensions.width / 2 : position.x,
              positionY: position.y,
              centerHorizontally: centerLocked,
            }
          : logo
      )
    );
  };

  const handleMouseUp = () => {
    const dragSession = dragSessionRef.current;
    dragSessionRef.current = null;
    setDraggingControlPoint(null);
    if (dragSession && !dragSession.hasMoved) {
      onControlPointClick(dragSession.code);
    }
  };

  return { draggingControlPoint, handleMouseDown, handleMouseMove, handleMouseUp };
}
