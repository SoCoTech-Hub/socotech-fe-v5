import { api } from "../../api/api";

export const forgotPassword = async (email: string): Promise<void> => {
  // Prevent function from running on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    await api.POST("/auth/forgot-password", { email: email.trim() });
  } catch (error: any) {
    console.error(
      "An error occurred while requesting password reset:",
      error?.response || error,
    );
    throw new Error("Failed to send forgot password request.");
  }
};

export default forgotPassword;
