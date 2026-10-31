// Список логотипів поточної сторони
export default function LogoList({ logos, controlPoints, maxCount, selectedLogoId, onSelect, onRemoveFromPoint }) {
  return (
    <div style={{ marginTop: '14px' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
        Розміщені логотипи на цій стороні ({logos.length} із {maxCount}):
      </div>

      <div className="logo-list">
        {logos.length === 0 && (
          <div style={{ fontSize: '12px', color: '#64748b', padding: '8px 2px' }}>
            Поки що порожньо — завантажте файли логотипів вище.
          </div>
        )}

        {logos.map((logo) => {
          const cp = controlPoints.find((p) => p.code === logo.controlPointCode);
          return (
            <div
              key={logo.id}
              className={`logo-list-item ${selectedLogoId === logo.id ? 'selected' : ''}`}
              onClick={() => onSelect(logo.id)}
            >
              <div className="logo-item-info">
                <div className="kit-slot-thumb">
                  {logo.svg ? (
                    <div style={{ width: '22px', height: '22px' }} dangerouslySetInnerHTML={{ __html: logo.svg }} />
                  ) : logo.imageUrl ? (
                    <img src={logo.imageUrl} alt="" style={{ maxWidth: '22px', maxHeight: '22px' }} />
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 900 }}>
                      {logo.type === 'number' ? logo.textContent || '#' : 'T'}
                    </span>
                  )}
                </div>
                <div>
                  <div className="logo-item-title">{logo.name}</div>
                  <div className="logo-item-sub">
                    <span className="control-point-tag">📍 {cp?.name || 'Контрольна точка'}</span>
                  </div>
                </div>
              </div>
              <div className="logo-item-actions">
                <button
                  className="btn-icon-sm danger"
                  title="Зняти з точки до буфера"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromPoint(logo.id);
                  }}
                >
                  ↘
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
