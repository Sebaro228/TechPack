const A4_W = 595.28;
const A4_H = 841.89;
const PAGE_MARGIN = 20;

const dataUrlToBytes = (dataUrl) => {
  const binary = atob(dataUrl.replace(/^data:image\/jpeg;base64,/, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

// Побудова валідного багатосторінкового PDF 1.4: одна JPEG-картинка на сторінку.
// pages: [{ dataUrl, width, height }]  (width/height — у пікселях картинки)
export function buildPdfDocument(pages) {
  const encoder = new TextEncoder();
  const parts = [];
  const offsets = [];
  let offset = 0;

  const push = (data) => {
    const bytes = typeof data === 'string' ? encoder.encode(data) : data;
    parts.push(bytes);
    offset += bytes.length;
  };
  const beginObject = (id) => {
    offsets[id] = offset; // реальне зміщення в байтах
  };

  push('%PDF-1.4\n%âãÏÓ\n');

  // Нумерація: 1 — Catalog, 2 — Pages, далі для кожної сторінки: Page, Image, Content
  beginObject(1);
  push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  const kids = pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ');
  beginObject(2);
  push(`2 0 obj\n<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>\nendobj\n`);

  pages.forEach((page, i) => {
    const pageId = 3 + i * 3;
    const imgId = pageId + 1;
    const contentId = pageId + 2;
    const imgBytes = dataUrlToBytes(page.dataUrl);

    const maxW = A4_W - PAGE_MARGIN * 2;
    const maxH = A4_H - PAGE_MARGIN * 2;
    const aspect = page.width / page.height;
    let drawW = maxW;
    let drawH = drawW / aspect;
    if (drawH > maxH) {
      drawH = maxH;
      drawW = drawH * aspect;
    }
    const drawX = (A4_W - drawW) / 2;
    // Картинку притискаємо до верху сторінки
    const drawY = A4_H - PAGE_MARGIN - drawH;

    const stream = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm\n/Im1 Do\nQ\n`;

    beginObject(pageId);
    push(
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_W.toFixed(2)} ${A4_H.toFixed(2)}] ` +
        `/Resources << /XObject << /Im1 ${imgId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`
    );

    beginObject(imgId);
    push(
      `${imgId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`
    );
    push(imgBytes);
    push('\nendstream\nendobj\n');

    beginObject(contentId);
    push(`${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}endstream\nendobj\n`);
  });

  const objectCount = 3 + pages.length * 3; // разом з нульовим об'єктом
  const startXref = offset;
  let xref = `xref\n0 ${objectCount}\n0000000000 65535 f \n`;
  for (let id = 1; id < objectCount; id++) {
    xref += offsets[id].toString().padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size ${objectCount} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  push(xref);

  return new Blob(parts, { type: 'application/pdf' });
}

// SVG-рядок -> JPEG data URL (2x для чіткості)
function rasterizeSvg(svgString, width, height) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve({ dataUrl: canvas.toDataURL('image/jpeg', 0.95), width: canvas.width, height: canvas.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Не вдалося растеризувати SVG'));
    };
    img.src = url;
  });
}

// Збирає усі види в один PDF (по сторінці на кожен) і завантажує файл.
// pieces: [{ svgString, width, height }]
export async function downloadPiecesAsPdf(pieces, filename) {
  try {
    const pages = [];
    for (const piece of pieces) {
      pages.push(await rasterizeSvg(piece.svgString, piece.width, piece.height));
    }

    const pdfUrl = URL.createObjectURL(buildPdfDocument(pages));
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(pdfUrl);
  } catch {
    window.print();
  }
}