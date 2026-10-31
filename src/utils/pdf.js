// Побудова валідного PDF 1.4 файлу
export function buildPdfDocument(jpegDataUrl, imgPixelW, imgPixelH) {
  const base64Data = jpegDataUrl.replace(/^data:image\/jpeg;base64,/, '');
  const binaryImg = atob(base64Data);
  const imgBytes = new Uint8Array(binaryImg.length);
  for (let i = 0; i < binaryImg.length; i++) {
    imgBytes[i] = binaryImg.charCodeAt(i);
  }

  const a4W = 595.28;
  const a4H = 841.89;
  const margin = 20;
  const maxDrawW = a4W - margin * 2;
  const maxDrawH = a4H - margin * 2;

  const imgAspect = imgPixelW / imgPixelH;
  let drawW = maxDrawW;
  let drawH = drawW / imgAspect;

  if (drawH > maxDrawH) {
    drawH = maxDrawH;
    drawW = drawH * imgAspect;
  }

  const drawX = (a4W - drawW) / 2;
  const drawY = (a4H - drawH) / 2;

  const streamContent = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm\n/Im1 Do\nQ\n`;

  const encoder = new TextEncoder();
  const parts = [];
  parts.push(encoder.encode('%PDF-1.4\n%âãÏÓ\n'));

  const offsets = [];
  let currentOffset = 15;

  offsets.push(currentOffset);
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  parts.push(encoder.encode(obj1));
  currentOffset += encoder.encode(obj1).length;

  offsets.push(currentOffset);
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  parts.push(encoder.encode(obj2));
  currentOffset += encoder.encode(obj2).length;

  offsets.push(currentOffset);
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${a4W.toFixed(2)} ${a4H.toFixed(2)}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`;
  parts.push(encoder.encode(obj3));
  currentOffset += encoder.encode(obj3).length;

  offsets.push(currentOffset);
  const obj4Head = `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgPixelW} /Height ${imgPixelH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`;
  parts.push(encoder.encode(obj4Head));
  parts.push(imgBytes);
  const obj4Tail = '\nendstream\nendobj\n';
  parts.push(encoder.encode(obj4Tail));
  currentOffset += encoder.encode(obj4Head).length + imgBytes.length + encoder.encode(obj4Tail).length;

  offsets.push(currentOffset);
  const obj5 = `5 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}endstream\nendobj\n`;
  parts.push(encoder.encode(obj5));
  currentOffset += encoder.encode(obj5).length;

  const startXref = currentOffset;
  let xref = `xref\n0 6\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    xref += off.toString().padStart(10, '0') + ' 00000 n \n';
  });
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  parts.push(encoder.encode(xref));

  return new Blob(parts, { type: 'application/pdf' });
}

// Серіалізує SVG макет у JPEG і завантажує як PDF
export function downloadSvgAsPdf(svgEl, { width, height, filename }) {
  if (!svgEl) {
    window.print();
    return;
  }

  try {
    const svgString = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(blobURL);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdfBlob = buildPdfDocument(imgData, canvas.width, canvas.height);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl);
    };
    img.src = blobURL;
  } catch {
    window.print();
  }
}
