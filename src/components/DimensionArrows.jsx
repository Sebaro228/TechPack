import { round1 } from '../utils/geometry';

// Виносні розмірні стрілки для обраного логотипа
export default function DimensionArrows({
  logo,
  logoPx,
  logoY,
  logoX,
  scaledW,
  neckPxY,
  neckCm,
  sizeScale,
  centerX,
  pX,
}) {
  const { x, y, w, h } = logoPx;
  const axisX = logo.centerHorizontally ? centerX : x + w / 2;

  return (
    <g>
      {/* Вертикальна лінія від горловини */}
      <line
        x1={axisX}
        y1={neckPxY}
        x2={axisX}
        y2={y}
        stroke="#dc2626"
        strokeWidth="2"
        markerStart="url(#arr-start-red)"
        markerEnd="url(#arr-end-red)"
      />
      <rect
        x={axisX + 8}
        y={(neckPxY + y) / 2 - 11}
        width="84"
        height="22"
        rx="3"
        fill="#ffffff"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <text x={axisX + 14} y={(neckPxY + y) / 2 + 5} fontSize="12" fontWeight="bold" fill="#b91c1c">
        ↕ {round1(Math.max(0, logoY - neckCm * sizeScale))} см
      </text>

      {/* Горизонтальна лінія ширини */}
      <line
        x1={x}
        y1={y + h + 16}
        x2={x + w}
        y2={y + h + 16}
        stroke="#2563eb"
        strokeWidth="1.5"
        markerStart="url(#arr-start-blue)"
        markerEnd="url(#arr-end-blue)"
      />
      <text x={x + w / 2} y={y + h + 30} fontSize="11" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">
        ↔ {scaledW} см
      </text>

      {/* Відступ або статус центрування */}
      {logo.centerHorizontally ? (
        <text x={centerX} y={y + h + 46} fontSize="11" fontWeight="bold" fill="#16a34a" textAnchor="middle">
          ✓ Центровано по осі форми
        </text>
      ) : (
        <g>
          <line
            x1={pX}
            y1={y + h / 2}
            x2={x}
            y2={y + h / 2}
            stroke="#16a34a"
            strokeWidth="1.5"
            markerStart="url(#arr-start-blue)"
            markerEnd="url(#arr-end-blue)"
          />
          <text x={(pX + x) / 2} y={y + h / 2 - 6} fontSize="11" fontWeight="bold" fill="#15803d" textAnchor="middle">
            Від шва: {round1(logoX)} см
          </text>
        </g>
      )}
    </g>
  );
}
