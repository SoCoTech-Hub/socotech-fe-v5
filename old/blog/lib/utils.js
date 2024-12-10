import getGQLRequest from "@/snippets/getGQLRequest"

export const isPageActive = (pageHref, pathname, action = "") => {
  const pageHrefSplit = pageHref.split("/")
  const pathSplit = pathname.split("/")

  if (action || pageHrefSplit[2]) {
    return pageHrefSplit[2] === action
  }

  return pageHrefSplit[1] === pathSplit[1]
}

// @ts-ignore
export const range = (start, end) =>
  [...Array(end).keys()].map((i) => i + start)

export const mapLessonRating = (response) => {
  const total = response
    .map((rating) => rating.total)
    .reduce((previous, current) => Math.round(previous + current))

  const average = response
    .map((rating) => rating.id * rating.total)
    .reduce((previous, current) => Math.round(previous + current))

  return {
    total: total || 0,
    average: Math.round(average / total) || 0,
    ratings: response.map((rating) => ({
      ...rating,
      total: Math.round(rating.total),
      percentage: Math.round((rating.total / total) * 100),
    })),
  }
}

export const IMPOSSIBLE_ID = Number.NEGATIVE_INFINITY

export const USER = {
  id: IMPOSSIBLE_ID,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  profile_pic: {
    url: "",
  },
}

export const PROFILE_THUMBNAIL = {
  id: IMPOSSIBLE_ID,
  formats: {
    thumbnail: {
      width: 0,
      height: 0,
      url: "",
    },
  },
}

export const COMMENT = {
  id: IMPOSSIBLE_ID,
  content: "",
  authorUser: 0,
  created_at: "",
  updated_at: "",
  article: 0,
  related: [],
}

export const STARS = [
  {
    id: 1,
    total: 0,
    percentage: 0,
  },
  {
    id: 2,
    total: 0,
    percentage: 0,
  },
  {
    id: 3,
    total: 0,
    percentage: 0,
  },
  {
    id: 4,
    total: 0,
    percentage: 0,
  },
  {
    id: 5,
    total: 0,
    percentage: 0,
  },
]

export const RATING = {
  id: IMPOSSIBLE_ID,
  title: "",
  user: USER,
  star_rating: 0,
  created_at: "",
  updated_at: "",
  parent_rating: 0,
  description: null,
  comment: COMMENT,
  helpfull: {
    ...USER,
    profile_pic: { ...PROFILE_THUMBNAIL, ...USER.profile_pic },
  },
}

export const getNextButtonHref = async (lessonId, type, typeId) => {
  let { lessonModules } = await getGQLRequest({
    endpoint: `lessonModules`,
    where: `lessons: { id: [${lessonId}] }`,
    fields: `id`,
  })
  let { lmsAssignments } = await getGQLRequest({
    endpoint: `lmsAssignments`,
    where: `lessons: { id: [${lessonId}] }`,
    fields: `id`,
  })
  let { lmsQuizs } = await getGQLRequest({
    endpoint: `lmsQuizs`,
    where: `lessons: { id: [${lessonId}] }`,
    fields: `id`,
  })
  let { lmsSurveys } = await getGQLRequest({
    endpoint: `lmsSurveys`,
    where: `lessons: { id: [${lessonId}] }`,
    fields: `id`,
  })

  lessonModules = lessonModules.map((val) => `/module/${val.id}`)
  lmsAssignments = lmsAssignments.map((val) => `/assignment/${val.id}`)
  lmsQuizs = lmsQuizs.map((val) => `/quiz/${val.id}`)
  lmsSurveys = lmsSurveys.map((val) => `/survey/${val.id}`)

  const nextButtonPath = [
    ...lessonModules,
    ...lmsAssignments,
    ...lmsQuizs,
    ...lmsSurveys,
  ]

  let index = nextButtonPath.indexOf(`/${type}/${typeId}`)

  if (index >= 0 && nextButtonPath[index + 1]) {
    return `/${lessonId}${nextButtonPath[index + 1]}`
  }

  return `/${lessonId}`
}

export const formatDate = (date) => {
  let d = date ? date : new Date()

  let day = d.getDate()
  let month = d.getMonth() + 1
  const year = d.getFullYear()
  let hour = d.getHours()
  let minute = d.getMinutes()
  let second = d.getSeconds()

  if (day < 10) {
    day = `0${day}`
  }
  if (month < 10) {
    month = `0${month}`
  }
  if (hour < 10) {
    hour = `0${hour}`
  }
  if (minute < 10) {
    minute = `0${minute}`
  }
  if (second < 10) {
    second = `0${second}`
  }

  return {
    day,
    month,
    year,
    hour,
    minute,
    second,
    full: `${month}/${day}/${year} ${hour}:${minute}:${second}`,
    date_only: `${month}/${day}/${year}`,
  }
}

export const formatSeconds = (secondsToFormat = 0) => {
  const isoString = new Date(parseInt(secondsToFormat) * 1000)
    .toISOString()
    .substr(11, 8)
  const timeSplit = isoString.split(":")

  const hours = timeSplit[0] !== "00" ? `${timeSplit[0]}h ` : ""
  const minutes = timeSplit[1] !== "00" ? `${timeSplit[1]}m ` : ""
  const seconds = timeSplit[2] !== "00" ? `${timeSplit[2]}s` : ""

  return `${hours}${minutes}${seconds}`
}
