// Персоналізація номера та прізвища (Спинка)
export default function PlayerPersonalization({
  playerName,
  playerNumber,
  jerseyColor,
  onNameChange,
  onNumberChange,
  onColorChange,
}) {
  return (
    <div style={{ marginTop: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
      <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '8px', color: '#0f172a' }}>
        Персоналізація форми (Спинка):
      </div>
      <div className="form-row-3">
        <div className="form-group">
          <label>Прізвище</label>
          <input type="text" value={playerName} onChange={(e) => onNameChange(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Номер</label>
          <input type="text" value={playerNumber} onChange={(e) => onNumberChange(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Колір</label>
          <input
            type="color"
            value={jerseyColor}
            style={{ padding: '2px', height: '36px', cursor: 'pointer' }}
            onChange={(e) => onColorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
