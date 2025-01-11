import Cookies from "js-cookie";

import { api } from "../api/api";
import { domain, mainUrl, userId } from "../context/constants";

const logout = async (): Promise<void> => {
  if (userId) {
    try {
      // Mark user as logged out in the backend
      await api.PUT(`/users/${userId}`, { loggedIn: false });

      // Track the logout action
      await api.POST("/page-tracks", {
        time: 0,
        user: userId,
        title: "Logout",
        url: "/logout",
        action: ["Logout"],
      });
    } catch (error) {
      console.error("Error during logout API calls:", error);
    }
  }

  // Remove all cookies
  Object.keys(Cookies.get()).forEach((cookieName) => {
    const neededAttributes = {
      domain: domain,
      secure: true,
    };
    Cookies.remove(cookieName, neededAttributes);
  });

  // Clear local storage and set logout timestamp
  window.localStorage.clear();
  window.localStorage.setItem("logout", Date.now().toString());

  // Redirect to the logout page
  window.location.href = `${mainUrl}/auth/logout`;
};

export default logout;
