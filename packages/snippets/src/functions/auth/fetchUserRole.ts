import { runQuery } from "../../graphql";
import { GET_USER_ROLE } from "../../graphql/users/getUserRole";

export const fetchUserRole = async (userid: string) => {
  return await runQuery<{
    user: {
      role: {
        name: string;
      };
    };
  }>(GET_USER_ROLE, { userid });
};
