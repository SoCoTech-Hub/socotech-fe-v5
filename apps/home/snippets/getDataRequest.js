import publicapi from "@/api/publicapi"

const getDataRequest = async (
  endpoint,
  stateSetter,
  defaultValue = [],
  queryParamsObj = {}
) => {
  try {
    const apiObj = publicapi
    const response = await apiObj.get(endpoint, queryParamsObj)

    if (!response.ok) {
      stateSetter(defaultValue)
      return defaultValue
    }

    if (endpoint === "/users-permissions/roles") {
      ;("/auth/users-permissions/roles")
      stateSetter(response.data.roles)
      return response.data.roles
    }

    stateSetter(response.data)
    return response.data
  } catch (err) {
    stateSetter(defaultValue)
    return defaultValue
  }
}

export default getDataRequest
