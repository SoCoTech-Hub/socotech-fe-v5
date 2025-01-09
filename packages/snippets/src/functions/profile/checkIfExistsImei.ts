import { runQuery } from "../../graphql";
import { CHECK_IF_EXISTS_IMEI } from "../../graphql/profile/checkIfExistsImei";

interface CheckIfExistsImeiResponse {
  profiles: { id: string }[] | null;
}

interface CheckIfExistsImeiParams {
  imei: string;
  userId: string;
}

export const checkIfExistsImei = async ({
  imei,
  userId,
}: CheckIfExistsImeiParams): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const { profiles } = await runQuery<CheckIfExistsImeiResponse>(
      CHECK_IF_EXISTS_IMEI,
      { imei, userId },
    );
    return profiles ? profiles.length > 0 : false;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export default checkIfExistsImei;
