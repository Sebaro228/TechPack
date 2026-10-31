export default function Header({ onDownloadPdf, onPrint }) {
  return (
    <header className="app-header">
      <div className="header-title">
      </div>
      <div className="header-actions">
        <button className="btn-header-pdf" onClick={onDownloadPdf}>
          ⬇ PDF 
        </button>
        <button className="btn-header-print" onClick={onPrint}>
          🖨 Друк
        </button>
      </div>
    </header>
  );
}