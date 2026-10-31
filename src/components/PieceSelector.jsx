import { GRADING_RULES } from '../presets';

const PIECE_TABS = [
  { id: 'front', label: '👕 Поличка переду (6)' },
  { id: 'back', label: '🛡 Спинка (4)' },
  { id: 'sleeve', label: '🥋 Рукав (2)' },
];

// Вибір сторони форми (Перед / Спинка / Рукав) та розмірного ряду
export default function PieceSelector({
  selectedPiece,
  onSelectPiece,
  selectedSize,
  onSelectSize,
  filledCount,
  maxCount,
  isFull,
}) {
  return (
    <div className="card">
      <div className="card-title">
        <span>Сторона футбольної форми</span>
        <span className={`control-point-counter ${isFull ? 'full' : ''}`}>
          {filledCount} / {maxCount} точок заповнено
        </span>
      </div>
      <div className="piece-tabs">
        {PIECE_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`piece-tab-btn ${selectedPiece === tab.id ? 'active' : ''}`}
            onClick={() => onSelectPiece(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="form-group" style={{ marginTop: '10px' }}>
        <label>Розмірний ряд (масштабування за лекалом):</label>
        <div className="size-chips">
          {GRADING_RULES.map((rule) => (
            <button
              key={rule.size}
              className={`size-chip ${selectedSize === rule.size ? 'active' : ''}`}
              onClick={() => onSelectSize(rule.size)}
            >
              {rule.size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
