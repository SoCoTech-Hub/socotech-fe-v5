import { gql } from "graphql-tag";

import { runQuery } from "../runQuery";

export interface UserProfileResponse {
  user: {
    id: string;
    profile: {
      firstName: string;
      lastName: string;
      profilePic?: { url: string };
      banner?: { url: string };
    };
  };
}

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user(id: string) {
      id
      profile {
        firstName
        lastName
        profilePic {
          url
        }
        banner {
          url
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
    }
  }
`;
export const fetchUserProfile = async (id: string) => {
  const me = await runQuery<{ user: { id: string } }>(GET_ME, { id });
  return await runQuery<UserProfileResponse>(GET_USER_PROFILE, {
    id: me.user.id,
  });
};
