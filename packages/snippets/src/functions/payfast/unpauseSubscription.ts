import payfastApi from "../../api/payfast";
import { merchantId } from "../../context/constants";
import AddTimeStamp from "./addTimeStamp";
import GenerateSignature from "./generateSignature";

const UnpauseSubscription = async (
  subscriptionId: string,
): Promise<void | null> => {
  try {
    const Header: {
      "merchant-id": string;
      timestamp: string;
      version: string;
    } = {
      "merchant-id":
        process.env.NEXT_PUBLIC_TEST === "true" ? "10025140" : merchantId || "",
      timestamp: AddTimeStamp(),
      version: "v1",
    };

    const signature: string = GenerateSignature(Header);

    const response = await payfastApi.post(
      `/api/payfast-proxy?action=uncancel&subscriptionId=${subscriptionId}`,
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
    console.error(error);
    return null;
  }
};

export default UnpauseSubscription;
