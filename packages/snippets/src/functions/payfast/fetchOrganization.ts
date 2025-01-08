import { runQuery } from "../../graphql";
import { GET_ORGANIZATION_DETAIL } from "../../graphql/payfast/organization";

export const FetchOrganization = async (organizationId: string) => {
  return await runQuery<{
    organization: {
      name: string;
      primaryColor: string;
      secondaryColor: string;
      logo: { url: string };
      logoDark: { url: string };
      orgName: string;
      orgEmail: string;
      orgVat: string;
      orgUrl: string;
      merchantId: string;
    };
  }>(GET_ORGANIZATION_DETAIL, { organizationId });
};
