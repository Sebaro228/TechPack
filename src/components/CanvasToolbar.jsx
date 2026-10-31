import { getPieceLabel } from '../utils/geometry';

export default function CanvasToolbar({
  selectedSize,
  selectedPiece,
  effectiveW,
  effectiveH,
  sizeScale,
  showDimensions,
  showSeamAllowances,
  hasCustomControlPoints,
  onToggleDimensions,
  onToggleSeamAllowances,
  onResetControlPoints,
}) {
  return (
    <div className="canvas-toolbar">
      <div>
        <span style={{ fontWeight: 700, fontSize: '15px' }}>
          Інтерактивний макет футбольної форми ({selectedSize}) • {getPieceLabel(selectedPiece)}
        </span>
        <span style={{ marginLeft: '10px', fontSize: '12px', color: '#64748b' }}>
          Лекало: {effectiveW} × {effectiveH} см | Масштаб: ×{sizeScale}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-secondary" onClick={onToggleDimensions}>
          {showDimensions ? 'Приховати стрілки' : 'Показати стрілки'}
        </button>
        <button className="btn-secondary" onClick={onToggleSeamAllowances}>
          {showSeamAllowances ? 'Приховати припуски' : 'Показати припуски (3 мм)'}
        </button>
        <button
          className="btn-secondary"
          onClick={onResetControlPoints}
          disabled={!hasCustomControlPoints}
          title="Повернути технологічні точки розміщення до значень пресету"
        >
          Скинути точки
        </button>
      </div>
    </div>
  );
}
