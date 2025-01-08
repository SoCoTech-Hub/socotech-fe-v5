import payfastApi from "../../api/payfast";
import AddTimeStamp from "./addTimeStamp";
import GenerateSignature from "./generateSignature";

interface Org {
  merchantId: string;
}

export const PauseSubscription = async (
  subscriptionId: string,
  org: Org,
): Promise<void | null> => {
  try {
    const timestamp: string = AddTimeStamp();

    const Header: {
      "merchant-id": string;
      timestamp: string;
      version: string;
    } = {
      "merchant-id":
        process.env.NEXT_PUBLIC_TEST === "true" ? "10025140" : org.merchantId,
      timestamp: timestamp,
      version: "v1",
    };

    const signature: string = GenerateSignature(Header);

    const response = await payfastApi.post(
      `/api/payfast-proxy?action=cancel&subscriptionId=${subscriptionId}`,
      {
        merchantId: Header["merchant-id"],
        timestamp: Header.timestamp,
        signature: signature,
        version: Header.version,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error pausing subscription:", error);
    return null;
  }
};
