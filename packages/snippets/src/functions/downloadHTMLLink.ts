export default async function downloadHTMLLink(
  downloadLink: string,
  name: string,
): Promise<void> {
  try {
    const response = await fetch(downloadLink);

    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileURL = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = fileURL;
    anchor.download = name;
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Clean up the object URL to free memory
    URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
}
