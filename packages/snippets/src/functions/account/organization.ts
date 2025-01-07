import { organizationId } from "../../context/constants";
import {
  GET_ORGANIZATION_LOGOS,
  GET_ORGANIZATION_MERCHANT_ID,
  runQuery,
} from "../../graphql";

export const FetchOrganizationMerchantId = async () => {
  return await runQuery<{
    organization: {
      id: string;
      merchantId: string;
    };
  }>(GET_ORGANIZATION_MERCHANT_ID, { organizationId });
};

export const FetchOrganizationLogos = async () => {
  return await runQuery<{
    organization: {
      id: string;
      name?: string;
      logo?: { url: string };
      logoDark?: { url: string };
    };
  }>(GET_ORGANIZATION_LOGOS, { organizationId });
};
