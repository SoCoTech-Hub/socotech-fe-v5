import crypto from "crypto";

interface GenerateUniqueIdParams {
  organization: {
    name: string;
  };
  userid: string;
}

export const generateUniqueId = ({
  organization,
  userid,
}: GenerateUniqueIdParams): string => {
  // Current timestamp in seconds
  const date = Math.floor(Date.now() / 1000);

  // Construct the input string
  const inputString = `${organization.name}-${userid}-${date}`;

  // Generate an MD5 hash of the input string
  const md5Hash = crypto.createHash("md5").update(inputString).digest("hex");

  // Create the unique ID using the first letter of the organization name and part of the hash
  const uniqueId = `${organization.name.slice(0, 1).toUpperCase()}${md5Hash.slice(0, 8)}`;

  return uniqueId;
};

export default generateUniqueId;
