import api from "@/api/api";
import publicapi from "@/api/publicapi";
import Cookies from "js-cookie";

const jwtToken = Cookies.get("token");

const getDataRequest = async (
  endpoint,
  stateSetter,
  defaultValue = [],
  queryParamsObj = {}
) => {
  try {
    const apiObj = jwtToken ? api : publicapi;
    const response = await apiObj.get(endpoint, queryParamsObj);

    if (!response.ok) {
      stateSetter(defaultValue);
      return defaultValue;
    }

    if (endpoint === "/users-permissions/roles") {
      ("/auth/users-permissions/roles");
      stateSetter(response.data.roles);
      return response.data.roles;
    }

    stateSetter(response.data);
    return response.data;
  } catch (err) {
    stateSetter(defaultValue);
    return defaultValue;
  }
};

export default getDataRequest;
