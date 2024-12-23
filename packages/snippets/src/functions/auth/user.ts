import { runQuery } from "../../graphql";
import { GET_USER_BY_EMAIL } from "../../graphql/auth/user";

export const FetchUserByEmail = async ({ email }: { email: string }) => {
  return await runQuery<{
    id?: string[];
  }>(GET_USER_BY_EMAIL, { email });
};
