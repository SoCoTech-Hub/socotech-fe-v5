import { baseUrl } from "../context/constants";

// Helper function to generate icon entries
const createIcons = (prefix: string, sizes: any[]) => {
  return sizes.map((size) => ({
    src: `${baseUrl}/${prefix}${size.fileName}`,
    sizes: size.dimensions,
  }));
};

// Define icon details
const windowsIcons = createIcons("icons/windows11/", [
  { fileName: "SmallTile.scale-100.png", dimensions: "71x71" },
  { fileName: "SmallTile.scale-125.png", dimensions: "89x89" },
  { fileName: "SmallTile.scale-150.png", dimensions: "107x107" },
  { fileName: "SmallTile.scale-200.png", dimensions: "142x142" },
  { fileName: "SmallTile.scale-400.png", dimensions: "284x284" },
  // Add other Windows icons here...
]);

const androidIcons = createIcons("icons/android/", [
  { fileName: "android-launchericon-512-512.png", dimensions: "512x512" },
  { fileName: "android-launchericon-192-192.png", dimensions: "192x192" },
  { fileName: "android-launchericon-144-144.png", dimensions: "144x144" },
  { fileName: "android-launchericon-96-96.png", dimensions: "96x96" },
  { fileName: "android-launchericon-72-72.png", dimensions: "72x72" },
  { fileName: "android-launchericon-48-48.png", dimensions: "48x48" },
]);

const iosIcons = createIcons("icons/ios/", [
  { fileName: "16.png", dimensions: "16x16" },
  { fileName: "20.png", dimensions: "20x20" },
  { fileName: "29.png", dimensions: "29x29" },
  { fileName: "32.png", dimensions: "32x32" },
  { fileName: "40.png", dimensions: "40x40" },
  // Add other iOS icons here...
]);

// Combine all icon lists
const FaviconList = [...windowsIcons, ...androidIcons, ...iosIcons];

export default FaviconList;
