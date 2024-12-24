import { ApiAffiliateSettingAffiliateSetting } from "@acme/api/graphql/index.js";

import { runQuery } from "../../graphql";
import { GET_AFFILIATE_SETTING_TERMS } from "../../graphql/affiliate/affiliateSettings";

export const FetchAffiliateSettingTerms = async (organizationId: string) => {
  return await runQuery<ApiAffiliateSettingAffiliateSetting>(
    GET_AFFILIATE_SETTING_TERMS,
    { organizationId },
  );
};
