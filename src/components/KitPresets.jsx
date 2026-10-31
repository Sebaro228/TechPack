import { FOOTBALL_KIT_PRESETS } from '../presets';
import { EMPTY_KIT_ID } from '../constants';
import PlayerPersonalization from './PlayerPersonalization';

// Готові комплекти + створення нового порожнього комплекта з логотипів
export default function KitPresets({
  selectedKitId,
  kitName,
  onKitNameChange,
  onApplyPreset,
  onCreateEmptyKit,
  personalization,
}) {
  const isEmptyKitActive = selectedKitId === EMPTY_KIT_ID;

  return (
    <div className="card">
      <div className="card-title">
        <span>Комплекти форми</span>
        <span style={{ fontSize: '11px', color: '#2563eb' }}>
          {isEmptyKitActive ? 'свій комплект' : '12 логотипів'}
        </span>
      </div>

      <div className="kit-presets-selector">
        {/* Новий порожній комплект */}
        <div
          className={`kit-preset-pill kit-preset-new ${isEmptyKitActive ? 'active' : ''}`}
          onClick={onCreateEmptyKit}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px' }}>
              {isEmptyKitActive ? kitName : '＋ Новий порожній комплект'}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Чистий макет без логотипів — додайте власні файли
            </div>
          </div>
          <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>
            {isEmptyKitActive ? 'Обрано' : 'Створити →'}
          </span>
        </div>

        {FOOTBALL_KIT_PRESETS.map((kit) => (
          <div
            key={kit.id}
            className={`kit-preset-pill ${selectedKitId === kit.id ? 'active' : ''}`}
            onClick={() => onApplyPreset(kit)}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>{kit.title}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>{kit.description}</div>
            </div>
            <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>Застосувати →</span>
          </div>
        ))}
      </div>

      {isEmptyKitActive && (
        <div className="form-group" style={{ marginTop: '12px' }}>
          <label>Назва комплекта</label>
          <input type="text" value={kitName} onChange={(e) => onKitNameChange(e.target.value)} />
        </div>
      )}

      <PlayerPersonalization {...personalization} />
    </div>
  );
}
