// Таблиця градації по всьому розмірному ряду (ТЗ 5)
export default function GradingTable({ rows, selectedSize }) {
  return (
    <div className="grading-table-card">
      <div className="card-title">
        <span>Автоматична градація розміщення за розмірним рядом (ТЗ 5)</span>
        <span className="badge-centered">Правило масштабування ТКШВ активовано</span>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Розмір</th>
              <th>Масштаб</th>
              <th>Ширина × Висота деталі</th>
              <th>Опис градації</th>
              <th>Виробничі інструкції для майстра термопреса</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => {
              const isCur = item.sizeName.startsWith(selectedSize);
              return (
                <tr key={item.sizeName} className={isCur ? 'highlight-row' : ''}>
                  <td>
                    <b>{item.sizeName}</b> {isCur && '(обраний)'}
                  </td>
                  <td>×{item.scaleFactor}</td>
                  <td>{item.garmentSize}</td>
                  <td>{item.description}</td>
                  <td style={{ fontSize: '11px', color: isCur ? '#1d4ed8' : '#334155' }}>{item.instructions}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
