import { runQuery } from "../../graphql";
import { CHECK_SERIAL } from "../../graphql/profile/checkIfExistsSerial";

interface CheckSerialResponse {
  profiles: { id: string }[] | null;
}

interface CheckSerialParams {
  serialnumber: string;
  userId: string;
}

export const checkSerial = async ({
  serialnumber,
  userId,
}: CheckSerialParams): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const { profiles } = await runQuery<CheckSerialResponse>(CHECK_SERIAL, {
      serialnumber,
      userId,
    });
    return profiles ? profiles.length > 0 : false;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export default checkSerial;
