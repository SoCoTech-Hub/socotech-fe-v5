import {
  GET_ORGANIZATION_LOGOS,
  GET_ORGANIZATION_MERCHANT_ID,
  runQuery,
} from "../../graphql";

export const FetchOrganizationMerchantId = async (id: string) => {
  return await runQuery<{
    organization: {
      id: string;
      merchantId: string;
    };
  }>(GET_ORGANIZATION_MERCHANT_ID, { id });
};

export const FetchOrganizationLogos = async (id: string) => {
  return await runQuery<{
    organization: {
      id: string;
      name?: string;
      logo?: { url: string };
      logoDark?: { url: string };
    };
  }>(GET_ORGANIZATION_LOGOS, { id });
};
