import { runQuery } from "../../graphql";
import { CHECK_EMAIL } from "../../graphql/users/checkEmail";

interface CheckEmailResponse {
  users: { provider: string }[] | null;
}

export const checkEmail = async (
  email: string,
): Promise<{ provider: string } | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  const { users } = await runQuery<CheckEmailResponse>(CHECK_EMAIL, { email });

  return users && users.length > 0 ? users[0] : null;
};

export default checkEmail;
