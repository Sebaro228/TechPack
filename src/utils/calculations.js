import { GRADING_RULES, REFERENCE_POINTS } from '../presets';
import { round1 } from './geometry';

export function getNeckPoint(piece) {
  return REFERENCE_POINTS[piece]?.find((p) => p.code.includes('NECK')) || { y: 3.0 };
}

// Розрахунок точних виробничих відстаней для активного логотипа
export function calculateDistances({ logo, piece, sizeScale, effectiveW, effectiveH, controlPoints }) {
  if (!logo) return null;

  const scaledW = round1(logo.width * sizeScale);
  const scaledH = round1(logo.height * sizeScale);
  const neckY = round1(getNeckPoint(piece).y * sizeScale);

  const scaledPosX = logo.centerHorizontally
    ? round1((effectiveW - scaledW) / 2)
    : round1(logo.positionX * sizeScale);
  const scaledPosY = round1(logo.positionY * sizeScale);

  const cp = controlPoints.find((p) => p.code === logo.controlPointCode);

  return {
    scaledW,
    scaledH,
    scaledPosX,
    scaledPosY,
    offsetFromNeck: round1(Math.max(0, scaledPosY - neckY)),
    offsetFromSideLeft: round1(scaledPosX),
    offsetFromSideRight: round1(Math.max(0, effectiveW - (scaledPosX + scaledW))),
    offsetFromBottom: round1(Math.max(0, effectiveH - (scaledPosY + scaledH))),
    offsetFromCenter: round1(Math.abs(scaledPosX + scaledW / 2 - effectiveW / 2)),
    controlPointName: cp?.name || 'Контрольна точка',
    standardRule: cp?.standardRule || 'FIFA / UEFA Standard',
  };
}

// Таблиця градації за розмірним рядом
export function generateGradingTable({ pieceW, pieceH, pieceLogos }) {
  return GRADING_RULES.map((rule) => {
    const logoSummaries = pieceLogos.map((l) => {
      const scaledW = round1(l.width * rule.scale);
      const scaledH = round1(l.height * rule.scale);
      const neckOffset = round1((l.positionY - 3.0) * rule.scale);
      const posX = l.centerHorizontally
        ? 'по осі'
        : `від шва ${round1(l.positionX * rule.scale)} см`;
      return `${l.name} (${scaledW}×${scaledH} см): вниз ${neckOffset} см, ${posX}`;
    });

    return {
      sizeName: rule.size,
      scaleFactor: rule.scale,
      garmentSize: `${round1(pieceW * rule.scale)} × ${round1(pieceH * rule.scale)} см`,
      description: rule.desc,
      instructions: logoSummaries.join(' | ') || 'Немає логотипів',
    };
  });
}
