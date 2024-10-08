import { useEffect } from "react"
import { useRouter } from "next/router"
import userid from "@/snippets/getUserid"
import getDataRequest from "@/snippets/getDataRequest"
import api from "@/api/api"

let timeSpent = 0

const TimeTracks = ({
  lesson,
  module,
  activity,
  lessonResponseSetter = null,
}) => {
  const router = useRouter()

  // Time tracking
  let startTime = new Date()

  useEffect(async () => {
    setInterval(() => {
      addTimeToLessonResponse()
    }, 60000)
  }, [])
  useEffect(async () => {
    if (lesson && module) {
      const response = await getDataRequest(
        `/time-tracks?lesson=${lesson}&user=${userid}&${activity}=${module}`,
        () => {}
      )
      if (response.length) {
        timeSpent = response[0].timeSpent
        setLessonResponse(response[0])
      }
    }
  }, [lesson, module])

  const setLessonResponse = (lessonResponse) => {
    if (lessonResponseSetter) {
      lessonResponseSetter([lessonResponse])
    }
  }

  useEffect(() => {
    router.events.on("routeChangeStart", addTimeToLessonResponse)
    return () => {
      router.events.off("routeChangeStart", addTimeToLessonResponse)
    }
  }, [])

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("beforeunload", addTimeToLessonResponse)
    }
    return () => {
      window.removeEventListener("beforeunload", addTimeToLessonResponse)
    }
  }, [process.browser])

  const addTimeToLessonResponse = async () => {
    const endTime = new Date()
    const elapsedTime = (endTime - startTime) / 1000 / 60 + timeSpent

    const response = await getDataRequest(
      `/time-tracks?lesson=${lesson}&user=${userid}&${activity}=${module}`,
      () => {}
    )
    if (response.length) {
      setLessonResponse(response[0])
      await api.put(`/time-tracks/${response[0].id}`, {
        timeSpent: elapsedTime,
      })
    }
  }

  return <></>
}

export default TimeTracks
