const LogoThumb = ({ logo }) => (
  <div className="kit-slot-thumb">
    {logo.svg ? (
      <div style={{ width: '22px', height: '22px' }} dangerouslySetInnerHTML={{ __html: logo.svg }} />
    ) : logo.imageUrl ? (
      <img src={logo.imageUrl} alt="" style={{ maxWidth: '22px', maxHeight: '22px' }} />
    ) : (
      <span style={{ fontSize: '11px', fontWeight: 900 }}>{logo.type === 'number' ? logo.textContent || '#' : 'T'}</span>
    )}
  </div>
);

export default function LogoBuffer({ logos, selectedLogoId, onSelect, onDelete }) {
  return (
    <div className="logo-buffer">
      <div className="card-title">
        <span>Буфер логотипів</span>
        <span className="control-point-counter">{logos.length}</span>
      </div>
      <p className="logo-buffer-hint">
        Виберіть логотип, а потім клацніть по вільній контрольній точці, щоб розмістити його знову.
      </p>
      {logos.length === 0 ? (
        <div className="logo-buffer-empty">Зняті з точок логотипи з’являться тут.</div>
      ) : (
        <div className="logo-list">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className={`logo-list-item ${selectedLogoId === logo.id ? 'selected' : ''}`}
              onClick={() => onSelect(logo.id)}
            >
              <div className="logo-item-info">
                <LogoThumb logo={logo} />
                <div>
                  <div className="logo-item-title">{logo.name}</div>
                  <div className="logo-item-sub">Клацніть, щоб вибрати для розміщення</div>
                </div>
              </div>
              <div className="logo-item-actions">
                <button
                  className="btn-icon-sm danger"
                  title="Остаточно видалити з буфера"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(logo.id);
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
