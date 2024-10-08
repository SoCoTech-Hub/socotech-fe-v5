import { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import api from "@/api/api"
import { userId } from "@/context/constants"

const startTime = new Date()

const PageTracking = () => {
  const { pathname, route, asPath, basePath } = useRouter()
  const [actionsArray, setActionsArray] = useState([])

  useEffect(() => {
    Router.events.on("routeChangeStart", createPageTrack)
    return () => {
      Router.events.off("routeChangeStart", createPageTrack)
    }
  }, [actionsArray])

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("beforeunload", createPageTrack)
    }
    return () => {
      window.removeEventListener("beforeunload", createPageTrack)
    }
  }, [process.browser, actionsArray])

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", function handleMouseDown(event) {
        const trackingAction = event.target.getAttribute("data-tracking-action")
        if (trackingAction) {
          setActionsArray([...actionsArray, trackingAction])
          document.removeEventListener("mousedown", handleMouseDown)
        }
      })
    }
  }, [process.browser, actionsArray])

  const createPageTrack = async (url, as, options) => {
    if (typeof url === "string" && url.endsWith("#")) return

    const currentUrl = `${basePath}${
      asPath !== "/" && asPath !== "/#" ? asPath : ""
    }`
    if (currentUrl === url) return

    const actions = [...actionsArray]
    if (typeof url === "string") actions.push(`Navigated to ${url}`)

    const endTime = new Date()
    const timeSpent = (endTime - startTime) / 1000 / 60
    await api.post("/page-tracks", {
      time: timeSpent,
      user: userId,
      title: document.title || "Page title not found",
      url: currentUrl,
      action: actions,
    })
    setActionsArray([])
  }

  return null

  // return (
  //   <>
  //     <div>{JSON.stringify(actionsArray)}</div>
  //     <pre>{JSON.stringify({pathname, route, asPath, basePath}, null, 2)}</pre>
  //   </>
  // )
}

export default PageTracking
