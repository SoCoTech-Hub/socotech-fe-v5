import Cookies from "js-cookie"
import api from "@/api/api"
import siyavulaApi from "@/api/siyavula"
import userid from "@/snippets/getUserid"

export const getSiyavulaClientToken = async (stateSetter = () => {}) => {
  const cookieToken = getTokenFromCookie(
    "sClientToken",
    "sClientTokenExpiresAt"
  )

  if (cookieToken) {
    stateSetter(cookieToken)
    return cookieToken
  }

  try {
    const tokenResponse = await siyavulaApi.post("/get-token", {
      name: process.env.NEXT_PUBLIC_SIYAVULA_USERNAME,
      password: process.env.NEXT_PUBLIC_SIYAVULA_PASSWORD,
      client_ip: "156.155.178.191",
      region: "ZA",
      curriculum: "CAPS",
      theme: "responsive",
    })

    const { token, time_to_live } = tokenResponse.data
    stateSetter(token)
    storeTokenOnCookie(
      "sClientToken",
      "sClientTokenExpiresAt",
      token,
      time_to_live
    )

    return token
  } catch (err) {
    console.error(err)
    return err
  }
}

export const getSiyavulaUserToken = async (uid, clientToken, stateSetter) => {
  const cookieToken = getTokenFromCookie("sUserToken", "sUserTokenExpiresAt")

  if (cookieToken) {
    stateSetter(cookieToken)
    return cookieToken
  }

  let tokenResponse = await siyavulaApi.get(
    `/user/${uid}/token`,
    {},
    { headers: { JWT: clientToken } }
  )

  // Create the user if its don't have a Siyavula account yet
  if (
    !tokenResponse.data ||
    (tokenResponse.data.errors &&
      tokenResponse.data.errors[0].code === "INVALID_USER")
  ) {
    await createSiyavulaUser(uid)

    tokenResponse = await siyavulaApi.get(
      `/user/${uid}/token`,
      {},
      { headers: { JWT: clientToken } }
    )
  }

  try {
    const { token, time_to_live } = tokenResponse.data
    stateSetter(token)
    storeTokenOnCookie("sUserToken", "sUserTokenExpiresAt", token, time_to_live)

    return token
  } catch (err) {
    console.error(err)
    return err
  }
}

export const createSiyavulaUser = async (uid) => {
  const resToken = await getSiyavulaClientToken()

  const userResponse = await api.get(`/users/${userid}`)
  const user = userResponse.data

  try {
    return await siyavulaApi.post(
      `/user`,
      {
        external_user_id: uid,
        role: "Learner",
        name: user.first_name,
        surname: user.last_name,
        password: "123456", // We'll keep 123456 for now
        grade: user.grade.name,
        country: "ZA",
        curriculum: "CAPS",
        email: user.email,
        dialling_code: "27",
        telephone: user.mobile_nr.replace(/[^0-9]+/gi, ""),
      },
      { headers: { JWT: resToken } }
    )
  } catch (err) {
    console.error(err)
    return err
  }
}

export const getSiyavulaAnswers = async (uid, clientToken) => {
  try {
    const siyavulaAnswers = await siyavulaApi.get(
      `/user/${uid}/report/practice`,
      {},
      { headers: { JWT: clientToken } }
    )

    return siyavulaAnswers.data ? siyavulaAnswers.data.data : []
  } catch (err) {
    console.error(err)
    return err
  }
}

const getTokenFromCookie = (tokenKey, expiresAtKey) => {
  const cookieToken = Cookies.get(tokenKey)
  let cookieTokenExpiresAt = Cookies.get(expiresAtKey)

  if (cookieToken && cookieTokenExpiresAt) {
    const dateNow = new Date()
    cookieTokenExpiresAt = new Date(parseInt(cookieTokenExpiresAt))

    if (dateNow.getTime() < cookieTokenExpiresAt.getTime()) {
      return cookieToken
    }
  }

  return null
}

const storeTokenOnCookie = (tokenKey, expiresAtKey, token, ttl) => {
  const expiresAt = new Date()
  expiresAt.setSeconds(expiresAt.getSeconds() + ttl)

  Cookies.set(tokenKey, token)
  Cookies.set(expiresAtKey, expiresAt.getTime())
}
