import { baseUrl } from "../../context/constants";

export const getConnectionSpeed = async (): Promise<number> => {
  const imageUrl = `${baseUrl}/500.png`;
  const downloadSize = 16149; // Bytes

  return new Promise<number>((resolve, reject) => {
    const resolutionArray = [
      { res: 144, mbps: 0.1 },
      { res: 240, mbps: 0.3 },
      { res: 360, mbps: 0.7 },
      { res: 480, mbps: 1.5 },
      { res: 720, mbps: 3 },
      { res: 1080, mbps: 6 },
      { res: 4160, mbps: 10 },
    ];

    const download = new Image();

    const startTime = new Date().getTime();

    download.onload = () => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // Seconds

      const bitsLoaded = downloadSize * 8; // Bits
      const speedMbps = (bitsLoaded / duration / (1024 * 1024)).toFixed(2);

      const speedInMbps = parseFloat(speedMbps);

      // Determine resolution based on speed
      if (speedInMbps < resolutionArray[0].mbps) {
        resolve(resolutionArray[0].res);
      } else if (
        speedInMbps >= resolutionArray[resolutionArray.length - 1].mbps
      ) {
        resolve(resolutionArray[resolutionArray.length - 1].res);
      } else {
        for (let i = 0; i < resolutionArray.length - 1; i++) {
          if (
            speedInMbps >= resolutionArray[i].mbps &&
            speedInMbps < resolutionArray[i + 1].mbps
          ) {
            resolve(resolutionArray[i].res);
            break;
          }
        }
      }
    };

    download.onerror = () => {
      console.error("Error downloading the image. Unable to measure speed.");
      reject(new Error("Error measuring connection speed."));
    };

    // Cache-buster to avoid cached image
    download.src = `${imageUrl}?nnn=${startTime}`;
  });
};
