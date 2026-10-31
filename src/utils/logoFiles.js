const isSvgFile = (file) => file.type.includes('svg') || file.name.endsWith('.svg');

export const stripExtension = (name) => name.replace(/\.[^/.]+$/, '');

// Зчитує файл логотипа і повертає { name, svg, imageUrl }
export function readLogoFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const name = stripExtension(file.name);
    const svgMode = isSvgFile(file);

    reader.onload = (ev) =>
      resolve({
        name,
        svg: svgMode ? ev.target.result : null,
        imageUrl: svgMode ? null : ev.target.result,
      });
    reader.onerror = () => reject(reader.error);

    if (svgMode) reader.readAsText(file);
    else reader.readAsDataURL(file);
  });
}

export const makeId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
