export default function downloadHTMLLink(downloadLink, name) {
  fetch(downloadLink).then((response) => {
    response.blob().then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      let alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = name;
      alink.click();
    });
  });
}
