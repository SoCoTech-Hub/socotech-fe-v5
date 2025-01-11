import { fetchUserRole } from "../../functions/auth/fetchUserRole"

interface AuthCheckParams {
  userid?: string;
}

const authCheck = async ({ userid = "" }: AuthCheckParams): Promise<string> => {
  if (!userid) {
    console.warn("No user ID provided. Redirecting to the home page.");
    return "/";
  }

  try {
    // Fetch user role using the refactored GraphQL query
    const { user } = await fetchUserRole(userid);

    if (user.role.name !== "Student") {
      return "../user/userdashboard";
    }

    return "../user";
  } catch (error: any) {
    console.error("Error during authentication check:", error);
    throw error;
  }
};

export default authCheck;
