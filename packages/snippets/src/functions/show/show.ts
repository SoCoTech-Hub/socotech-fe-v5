import { runQuery } from "../../graphql";
import { GET_SHOW_CARD__DETAILS } from "../../graphql/show/show";

export const FetchShowCardDetails = async (showCategoryId: string) => {
  return await runQuery<{
    shows: {
      id: string;
      name: string;
      image: {
        url: string;
      };
    }[];
  }>(GET_SHOW_CARD__DETAILS, {
    showCategoryId,
  });
};
