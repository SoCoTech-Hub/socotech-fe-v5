export default function encodeSVG(svg: string): string {
  if (typeof svg !== "string" || !svg.trim()) {
    throw new Error("Invalid SVG input. It must be a non-empty string.");
  }

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");

  return `url("data:image/svg+xml,${encoded}")`;
}
