const Metric = ({ label, value }) => (
  <div className="distance-metric">
    <div className="distance-metric-label">{label}</div>
    <div className="distance-metric-val">{value}</div>
  </div>
);

// Інспектор контрольної точки активного логотипа (незмінні відстані)
export default function LogoInspector({ logo, distances, selectedSize, inputRef, onReplaceFile }) {
  return (
    <div className="card">
      <div className="card-title">
        <span>Параметри: {logo.name}</span>
        <span className="locked-badge">🔒 Зафіксовано стандартом</span>
      </div>

      <div style={{ fontSize: '11px', color: '#475569', marginBottom: '10px' }}>
        Контрольна точка: <b>{distances.controlPointName}</b>
        <br />
        Регламент: <span style={{ color: '#1d4ed8' }}>{distances.standardRule}</span>
      </div>

      <div className="distance-inspector">
        <div style={{ fontWeight: 700, fontSize: '11px', color: '#166534' }}>
          📐 ТОЧНІ НЕЗМІННІ ВИРОБНИЧІ ВІДСТАНІ ({selectedSize}):
        </div>
        <div className="distance-grid">
          <Metric label="Від горловини вниз:" value={`${distances.offsetFromNeck} см`} />
          <Metric
            label="Від центральної осі:"
            value={logo.centerHorizontally ? '0.0 см (по осі)' : `${distances.offsetFromCenter} см`}
          />
          <Metric label="Від лівого шва:" value={`${distances.offsetFromSideLeft} см`} />
          <Metric label="Від правого шва:" value={`${distances.offsetFromSideRight} см`} />
          <Metric label="Від лінії низу:" value={`${distances.offsetFromBottom} см`} />
          <Metric label="Розмір на формі:" value={`${distances.scaledW} × ${distances.scaledH} см`} />
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <button
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => inputRef.current?.click()}
        >
          🔄 Замінити файл для цього логотипа
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".svg,image/svg+xml,.png,.jpg,.jpeg"
          style={{ display: 'none' }}
          onChange={onReplaceFile}
        />
      </div>
    </div>
  );
}
