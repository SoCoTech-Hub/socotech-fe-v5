import React, { useEffect, useState } from "react"
import Load from "@/components/Load"

const IFrame = ({ src }) => {
  const [loading, setLoading] = useState(true)

  const prefix = process.env.NEXT_PUBLIC_API_URL

  let encodedEmbedURL = encodeURI(
    `https://docs.google.com/gview?url=${prefix}${src}&embedded=true`
  )

  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe.contentWindow.addEventListener(
        "load",
        () => {
          const doc = iframe.contentWindow.document
          iframe.height = doc.body.scrollHeight
        },
        true
      )
      iframe.contentWindow.addEventListener(
        "resize",
        () => {
          iframe.height = iframe.contentWindow.document.body.scrollHeight + 40
        },
        true
      )
    })
  }, [])

  return (
    <div className="video">
      {loading ? <Load /> : <></>}
      <iframe
        width="100%"
        height="650"
        src={encodedEmbedURL}
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        className="iframe"
        preload={"auto"}
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  )
}
export default IFrame
