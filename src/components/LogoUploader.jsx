// Накидання набору логотипів на макет (Batch Dropper)
export default function LogoUploader({ inputRef, freeCount, maxCount, isFull, onFiles }) {
  return (
    <>
      <div className="card-title">
        <span>Накидання логотипів на макет</span>
        <span className="control-point-counter">{freeCount} вільних точок</span>
      </div>

      <div
        className={`batch-upload-box ${isFull ? 'disabled' : ''}`}
        onClick={() => {
          if (!isFull) inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".svg,image/svg+xml,.png,.jpg,.jpeg"
          style={{ display: 'none' }}
          onChange={onFiles}
        />
        <div style={{ fontSize: '20px', marginBottom: '4px' }}>📥</div>
        <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e40af' }}>
          {isFull ? 'Усі контрольні точки заповнені' : 'Натисніть або киньте файли логотипів сюди'}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
          {isFull
            ? `Досягнуто ліміту (${maxCount}/${maxCount}). Видаліть логотип, щоб звільнити місце.`
            : `Або клацніть по конкретній точці на лекалі, щоб додати файл саме туди`}
        </div>
      </div>
    </>
  );
}
