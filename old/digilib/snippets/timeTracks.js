import { useEffect } from "react"
import { useRouter } from "next/router"
import getDataRequest from "@/snippets/getDataRequest"
import api from "@/api/api"

let timeSpent = 0

const TimeTracks = ({ knowledgeBase, userId }) => {
  const router = useRouter()
  let startTime = new Date()

  useEffect(async () => {
    if (knowledgeBase) {
      const response = await getDataRequest(
        `/time-tracks?knowledgeBase=${knowledgeBase}&user=${userId}`,
        () => {}
      )
      if (response.length) {
        timeSpent = response[0].timeSpent
      }
    }
  }, [knowledgeBase])

  useEffect(() => {
    router.events.on("routeChangeStart", addTimeToKnowledgeBase)
    return () => {
      router.events.off("routeChangeStart", addTimeToKnowledgeBase)
    }
  }, [])

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("beforeunload", addTimeToKnowledgeBase)
    }
    return () => {
      window.removeEventListener("beforeunload", addTimeToKnowledgeBase)
    }
  }, [process.browser])

  const addTimeToKnowledgeBase = async () => {
    const endTime = new Date()
    const elapsedTime = (endTime - startTime) / 1000 / 60 + timeSpent

    const response = await getDataRequest(
      `/time-tracks?knowledgeBase=${knowledgeBase}&user=${userId}`,
      () => {}
    )
    if (response.length) {
      await api.put(`/time-tracks/${response[0].id}`, {
        timeSpent: elapsedTime,
      })
    }
  }

  return <></>
}

export default TimeTracks
