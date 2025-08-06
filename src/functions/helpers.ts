export const parseSVG = (svgContent: string) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
};
