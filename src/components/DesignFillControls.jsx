import { useRef } from 'react';

export default function DesignFillControls({ designFill, onUpload, onChange, onClear }) {
  const inputRef = useRef(null);
  const hasFill = Boolean(designFill?.dataUrl);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) onUpload(file);
  };

  return (
    <div className="card design-fill-card">
      <div className="card-title">
        <span>Дизайн заливки</span>
        {hasFill && <span className="control-point-counter">Застосовано</span>}
      </div>
      <p className="design-fill-hint">
        PNG або JPG буде обрізано по контуру вибраної деталі. Логотипи та технологічні точки залишаться поверх дизайну.
      </p>

      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFile}
      />
      <div className="design-fill-actions">
        <button className="btn-primary" type="button" onClick={() => inputRef.current?.click()}>
          {hasFill ? 'Замінити дизайн' : 'Додати дизайн'}
        </button>
        {hasFill && (
          <button className="btn-secondary" type="button" onClick={onClear}>
            Прибрати
          </button>
        )}
      </div>

      {hasFill && (
        <div className="design-fill-settings">
          <label>
            Масштаб: {designFill.scale.toFixed(0)}%
            <input
              type="range"
              min="100"
              max="250"
              step="5"
              value={designFill.scale}
              onChange={(event) => onChange({ scale: Number(event.target.value) })}
            />
          </label>
          <label>
            Зсув по горизонталі: {designFill.offsetX}%
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={designFill.offsetX}
              onChange={(event) => onChange({ offsetX: Number(event.target.value) })}
            />
          </label>
          <label>
            Зсув по вертикалі: {designFill.offsetY}%
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={designFill.offsetY}
              onChange={(event) => onChange({ offsetY: Number(event.target.value) })}
            />
          </label>
        </div>
      )}
    </div>
  );
}
