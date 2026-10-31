// Контрольний квадрат 50х50 мм та інструкція оператора
export default function CalibrationBlock({ pY, pH, sheetW, selectedSize }) {
  const top = pY + pH + 25;
  return (
    <g>
      <rect x="35" y={top} width="50" height="50" fill="#fafafa" stroke="#334155" strokeWidth="1.5" />
      {[45, 55, 65, 75].map((x) => (
        <line key={x} x1={x} y1={top} x2={x} y2={top + 6} stroke="#334155" strokeWidth="1" />
      ))}
      <text x="60" y={pY + pH + 53} fontSize="9" fontWeight="bold" fill="#0f172a" textAnchor="middle">
        50 × 50 мм
      </text>
      <text x="95" y={pY + pH + 47} fontSize="11" fontWeight="600" fill="#334155">
        Контрольний квадрат 50×50 мм
      </text>
      <text x="95" y={pY + pH + 63} fontSize="10" fill="#64748b">
        Для контролю масштабу лінійкою в цеху
      </text>

      {/* Блок інструкції цеху */}
      <rect x={sheetW - 440} y={top} width="405" height="50" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x={sheetW - 425} y={pY + pH + 45} fontSize="11" fontWeight="bold" fill="#92400e">
        ІНСТРУКЦІЯ ОПЕРАТОРА ТЕРМОПРЕСА:
      </text>
      <text x={sheetW - 425} y={pY + pH + 63} fontSize="11" fill="#0f172a">
        Розмір {selectedSize}: позиціонувати графіку суворо за регламентом UEFA/FIFA.
      </text>
    </g>
  );
}
