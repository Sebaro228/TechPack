export const PX_PER_CM = 10;
const MARGIN_TOP = 110;

export const round1 = (n) => Math.round(n * 10) / 10;

export const PIECE_LABELS = {
  front: 'Поличка переду',
  back: 'Спинка',
  sleeve: 'Рукав',
};

export const getPieceLabel = (piece) => PIECE_LABELS[piece] || PIECE_LABELS.sleeve;

// Геометрія аркуша та лекала (у пікселях SVG)
export function getSheetGeometry(effectiveW, effectiveH) {
  const pW = effectiveW * PX_PER_CM;
  const pH = effectiveH * PX_PER_CM;
  const sheetW = Math.max(780, pW + 200);
  const sheetH = pH + MARGIN_TOP + 170;
  return {
    pxPerCm: PX_PER_CM,
    pW,
    pH,
    sheetW,
    sheetH,
    pX: (sheetW - pW) / 2,
    pY: MARGIN_TOP,
    centerX: sheetW / 2,
  };
}

// Витягуємо viewBox із вбудованого SVG для правильного масштабування
export function extractViewBox(svgStr) {
  if (!svgStr) return null;
  const match = svgStr.match(/viewBox=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

// Контури деталей форми
export function renderContourPath(piece, w, h, pX, pY, sizeScale) {
  const neckY = pY + 3.0 * sizeScale * 10;
  const centerX = pX + w / 2;

  if (piece === 'back') {
    const neckRx = w * 0.18;
    const shoulderSlope = h * 0.055;
    const armpitY = h * 0.32;
    const waistIndent = w * 0.02;
    const backNeckY = pY + 1.2 * sizeScale * 10;

    return `M ${centerX - neckRx},${pY} 
        Q ${centerX},${backNeckY} ${centerX + neckRx},${pY} 
        L ${pX + w},${pY + shoulderSlope} 
        Q ${pX + w - w * 0.075 - 5},${pY + armpitY * 0.55} ${pX + w - w * 0.075},${pY + armpitY} 
        L ${pX + w - waistIndent},${pY + h} 
        L ${pX + waistIndent},${pY + h} 
        L ${pX + w * 0.075},${pY + armpitY} 
        Q ${pX + w * 0.075 + 5},${pY + armpitY * 0.55} ${pX},${pY + shoulderSlope} Z`;
  }

  if (piece === 'sleeve') {
    const topY = pY;
    const bY = pY + h;
    return `M ${centerX},${topY} 
        C ${pX + w * 0.8},${topY} ${pX + w},${pY + h * 0.25} ${pX + w},${pY + h * 0.45} 
        L ${pX + w * 0.9},${bY} 
        L ${pX + w * 0.1},${bY} 
        L ${pX},${pY + h * 0.45} 
        C ${pX},${pY + h * 0.25} ${pX + w * 0.2},${topY} ${centerX},${topY} Z`;
  }

  // Front
  const neckRx = w * 0.18;
  const shoulderSlope = h * 0.06;
  const armpitY = h * 0.33;
  const waistIndent = w * 0.02;

  return `M ${centerX - neckRx},${pY} 
        Q ${centerX},${neckY * 1.05} ${centerX + neckRx},${pY} 
        L ${pX + w},${pY + shoulderSlope} 
        Q ${pX + w - w * 0.08 - 5},${pY + armpitY * 0.55} ${pX + w - w * 0.08},${pY + armpitY} 
        L ${pX + w - waistIndent},${pY + h} 
        L ${pX + waistIndent},${pY + h} 
        L ${pX + w * 0.08},${pY + armpitY} 
        Q ${pX + w * 0.08 + 5},${pY + armpitY * 0.55} ${pX},${pY + shoulderSlope} Z`;
}
