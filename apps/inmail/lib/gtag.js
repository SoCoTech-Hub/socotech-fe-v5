import Cookies from 'js-cookie'

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTAG_ID
export const GA_TRACKING_ID_VIDEO = process.env.NEXT_PUBLIC_GTAG_ID_VIDEO

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  let configObj = {
    page_path: url
  }

  const uid = Cookies.get('userUniqueId')

  if (uid && uid !== NaN) {
    configObj = {
      ...configObj,
      user_id: decodeURI(uid)
    }
  }

  window.gtag('config', GA_TRACKING_ID, configObj)
  window.gtag('config', GA_TRACKING_ID_VIDEO, configObj)
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}