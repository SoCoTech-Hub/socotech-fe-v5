import { runQuery } from "../../graphql";
import { GET_PROFILES_BY_VOUCHER } from "../../graphql/profile/getProfilesByVoucher";
import { GET_VOUCHER } from "../../graphql/voucher/getVoucher";

interface Voucher {
  id: string;
  number: string;
  details?: Record<string, any>;
}

interface CheckVoucherParams {
  voucher: string;
}

export const checkVoucher = async ({
  voucher,
}: CheckVoucherParams): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  if (!voucher) {
    return false;
  }

  try {
    // Fetch the voucher details
    const { vouchers } = await runQuery<{ vouchers: Voucher[] }>(GET_VOUCHER, {
      number: voucher,
    });

    if (vouchers.length === 0) {
      return false; // No voucher found
    }

    const voucherData = vouchers[0];

    // Verify if the voucher is already associated with a profile
    const { profiles } = await runQuery<{ profiles: { id: string }[] }>(
      GET_PROFILES_BY_VOUCHER,
      {
        voucherId: voucherData.id,
      },
    );

    if (profiles.length > 0) {
      return false; // Voucher is already used
    }

    return !!voucherData; // Voucher is valid and not used
  } catch (error) {
    console.error("An error occurred while checking the voucher:", error);
    return false;
  }
};

export default checkVoucher;
