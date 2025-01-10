import { gql } from "graphql-tag";

import { api } from "../../api/api";
import { mainUrl, userId } from "../../context/constants";
import { runQuery } from "../../graphql";
import splitEmail from "../splitEmail";

export default async function deleteAccount({
  reason,
  option,
  list,
}: {
  reason: string;
  option: string;
  list: { value: string; description: string }[];
}): Promise<{ success: boolean; message?: string }> {
  if (!userId) {
    return { success: false, message: "Something went wrong" };
  }

  try {
    // Inline GraphQL Query
    const GET_USER_DATA = gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          email
          profile {
            id
            uniqueId
            kins {
              id
            }
          }
        }
      }
    `;

    // Fetch user data
    const { user } = await runQuery<{ user: any }>(GET_USER_DATA, {
      id: userId,
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const { domain } = splitEmail(user.email);
    const item = list.find((i) => i.value === option);

    if (!item) {
      return { success: false, message: "Invalid option selected" };
    }

    // Sanitize user data
    const sanitizedKin = {
      firstName: user.profile.uniqueId,
      lastName: user.profile.uniqueId,
      userRelation: null,
      mobileNr: user.profile.uniqueId,
      email: `${user.profile.uniqueId}@${domain}`,
    };

    const sanitizedProfile = {
      firstName: user.profile.uniqueId,
      lastName: user.profile.uniqueId,
      mobileNr: user.profile.uniqueId,
      banner: null,
      profilePic: null,
      about: `${item.description}: ${reason}`,
      dob: null,
    };

    const sanitizedUser = {
      email: `${user.profile.uniqueId}@${domain}`,
      username: user.profile.uniqueId,
      blocked: true,
      confirmed: false,
      expiryDate: new Date(),
      loggedIn: false,
      deleted: true,
    };

    // Update kin data if exists
    if (user.profile.kins.length) {
      const kinResponse = await api.PUT(
        `parents/${user.profile.kins[0].id}`,
        sanitizedKin,
      );
      if (!kinResponse) {
        return { success: false };
      }
    }

    // Update profile data
    const profileResponse = await api.PUT(
      `profiles/${user.profile.id}`,
      sanitizedProfile,
    );
    if (!profileResponse) {
      return { success: false };
    }

    // Update user data
    const userResponse = await api.PUT(`users/${userId}`, sanitizedUser);
    if (!userResponse) {
      return { success: false};
    }

    // Clear cookies and localStorage
    // Object.keys(Cookies.get()).forEach((cookieName) => {
    //   Cookies.remove(cookieName, { domain, secure: true });
    // });
    window.localStorage.clear();
    window.localStorage.setItem("logout", Date.now().toString());

    // Redirect to logout page
    window.location.href = `${mainUrl}/auth/logout`;
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting account:", error);
    return { success: false, message: error.message || "An error occurred" };
  }
}
