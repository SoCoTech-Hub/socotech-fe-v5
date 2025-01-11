function unicodeToChar(text: string): string {
  if (!text) return "";
  return text.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
    String.fromCharCode(parseInt(match.slice(2), 16)),
  );
}

export default unicodeToChar;
