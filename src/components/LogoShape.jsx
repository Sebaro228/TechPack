import { extractViewBox } from '../utils/geometry';

const SelectionRect = ({ x, y, w, h, rx = 3 }) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={rx}
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeDasharray="4,3"
  />
);

// Візуальне представлення одного логотипа на макеті (SVG / растр / номер / прізвище / заглушка)
export default function LogoShape({ logo, x, y, w, h, isSelected, fallbackColor }) {
  if (logo.svg) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <svg
          width={w}
          height={h}
          viewBox={extractViewBox(logo.svg) || '0 0 100 100'}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          dangerouslySetInnerHTML={{ __html: logo.svg.replace(/^<svg[^>]*>|<\/svg>$/gi, '') }}
        />
        {isSelected && <SelectionRect x={0} y={0} w={w} h={h} />}
      </g>
    );
  }

  if (logo.imageUrl) {
    return (
      <g>
        <image href={logo.imageUrl} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid meet" />
        {isSelected && <SelectionRect x={x} y={y} w={w} h={h} />}
      </g>
    );
  }

  if (logo.type === 'number' && logo.textContent) {
    return (
      <g>
        <text
          x={x + w / 2}
          y={y + h * 0.85}
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fontSize={h * 0.8}
          fontWeight="900"
          fill={logo.color || fallbackColor}
          textAnchor="middle"
        >
          {logo.textContent}
        </text>
        {isSelected && <SelectionRect x={x} y={y} w={w} h={h} rx={4} />}
      </g>
    );
  }

  if (logo.type === 'name' && logo.textContent) {
    return (
      <g>
        <text
          x={x + w / 2}
          y={y + h * 0.75}
          fontFamily="'Arial Black', 'Trebuchet MS', sans-serif"
          fontSize={h * 0.65}
          fontWeight="bold"
          letterSpacing="4"
          fill={logo.color || fallbackColor}
          textAnchor="middle"
        >
          {logo.textContent.toUpperCase()}
        </text>
        {isSelected && <SelectionRect x={x} y={y} w={w} h={h} rx={4} />}
      </g>
    );
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="#eff6ff"
        stroke={isSelected ? '#2563eb' : '#94a3b8'}
        strokeWidth={isSelected ? 2 : 1}
      />
      <text x={x + w / 2} y={y + h / 2 + 4} fontSize="11" fontWeight="bold" fill="#1e40af" textAnchor="middle">
        {logo.name}
      </text>
    </g>
  );
}
