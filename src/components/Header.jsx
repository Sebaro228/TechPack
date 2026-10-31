export default function Header({ onDownloadPdf, onPrint }) {
  return (
    <header className="app-header">
      <div className="header-title">
        <span className="badge-tag">Завдання 5</span>
        <h1>Placement Tech-Pack Generator • Футбольна форма & Лекала</h1>
      </div>
      <div className="header-actions">
        <button className="btn-header-pdf" onClick={onDownloadPdf}>
          ⬇ Завантажити у PDF
        </button>
        <button className="btn-header-print" onClick={onPrint}>
          🖨 Друк
        </button>
      </div>
    </header>
  );
}
