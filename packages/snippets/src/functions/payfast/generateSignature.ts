import crypto from "crypto";

import GetPassPhrase from "./getPassPhrase";

interface DataObject {
  [key: string]: string | number | null | undefined;
}

const GenerateSignature = (data: DataObject): string => {
  const passPhrase = GetPassPhrase();

  // Add the passPhrase to the data object
  if (passPhrase !== null) {
    data.passphrase = passPhrase.trim();
  }

  // Arrange the array by key alphabetically for API calls
  const orderedData: DataObject = {};
  Object.keys(data)
    .sort()
    .forEach((key) => {
      orderedData[key] = data[key];
    });

  // Create the query string
  let queryString = Object.keys(orderedData)
    .map(
      (key) =>
        `${key}=${encodeURIComponent(String(orderedData[key])).replace(/%20/g, "+")}`,
    )
    .join("&");

  // Remove the last '&'
  // queryString = queryString.substring(0, queryString.length - 1);

  // Hash the data and create the signature
  return crypto.createHash("md5").update(queryString).digest("hex");
};

export default GenerateSignature;
