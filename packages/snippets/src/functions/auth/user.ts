import { runQuery } from "../../graphql";
import { GET_USER_BY_EMAIL, GET_USER_DETAIL } from "../../graphql/auth/user";
import { User } from "../../types";

export const FetchUserByEmail = async ({ email }: { email: string }) => {
  return await runQuery<{
    id?: string[];
  }>(GET_USER_BY_EMAIL, { email });
};
export const FetchUserDetail = async (userId: string) => {
  return await runQuery<User>(GET_USER_DETAIL, { userId });
};
