import crypto from "crypto";
import dns from "dns";
import { IncomingMessage } from "http";
import axios from "axios";

export const lookupIpAddresses = async (domain: string): Promise<string[]> => {
  return new Promise((resolve, _reject) => {
    dns.lookup(domain, { all: true }, (err, addresses) => {
      if (err) {
        console.error(`Failed to lookup IP for domain: ${domain}`, err);
        // Resolve with an empty array to continue processing other domains
        return resolve([]);
      }
      resolve(addresses.map((addr) => addr.address));
    });
  });
};

let cachedIps: string[] | null = null;
const getPayFastIps = async (): Promise<string[]> => {
  if (!cachedIps) {
    const validHosts = [
      "www.payfast.co.za",
      "sandbox.payfast.co.za",
      "w1w.payfast.co.za",
      "w2w.payfast.co.za",
    ];
    try {
      // Use Promise.allSettled to ensure all lookups run and handle errors gracefully
      const ipResults = await Promise.allSettled(
        validHosts.map(lookupIpAddresses),
      );

      // Filter out any rejected lookups and collect only successful results
      cachedIps = ipResults
        .filter(
          (result): result is PromiseFulfilledResult<string[]> =>
            result.status === "fulfilled",
        )
        .flatMap((result) => result.value);

      // Reset cache after 10 minutes
      setTimeout(() => {
        cachedIps = null;
      }, 600000); // cache for 10 minutes
    } catch (err) {
      console.error("Error fetching PayFast IPs:", err);
      return [];
    }
  }
  return cachedIps;
};

export const validatePfIp = async (req: IncomingMessage): Promise<boolean> => {
  const clientIp =
    (req.headers["x-forwarded-for"] as string | undefined) ||
    req.connection.remoteAddress ||
    "";
  const validIps = await getPayFastIps();
  return new Set(validIps).has(clientIp);
};

export const validatePfPaymentData = (
  cartTotal: string | number,
  data: Record<string, string>,
): boolean => {
  return (
    Math.abs(
      parseFloat(cartTotal.toString()) - parseFloat(data["amount_gross"]),
    ) <= 0.01
  );
};

export const validatePfServerConfirmation = async (
  host: string,
  paramString: string,
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `https://${host}/eng/query/validate`,
      paramString,
    );
    return response.data === "VALID";
  } catch (error) {
    console.error("Error validating server confirmation:", error);
    return false;
  }
};

export const validatePfSignature = (
  data: Record<string, string>,
  paramString: string,
): boolean => {
  const pfPassphrase =
    process.env.NEXT_PUBLIC_TEST === "true" ? null : "VzVT6yHrGSRmfEWZj2m9";
  const finalString = pfPassphrase
    ? `${paramString}&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`
    : paramString;
  const signature = crypto.createHash("md5").update(finalString).digest("hex");
  return data["signature"] === signature;
};

export const buildPfParamString = (data: Record<string, string>): string => {
  return Object.keys(data)
    .filter((key) => key !== "signature")
    .map(
      (key) =>
        `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}`,
    )
    .join("&");
};
