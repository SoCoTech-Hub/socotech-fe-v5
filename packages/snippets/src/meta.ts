import Manifest from "./manifest";

const MetaList = {
  manifest: Manifest,
  icons: {
    icon: [
      { url: "/icon.png" },
      new URL("/icon.png", "https://example.com"),
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: ["/shortcut-icon.png"],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
};
export default MetaList;
// <meta charSet='utf-8' />

// 					<meta
// 						name='theme-color'
// 						content='#000'
// 					/>
// 					<script
// 						id='gtm-script'
// 						dangerouslySetInnerHTML={{
// 							__html: `(function (w, d, s, l, i) {
// 								w[l] = w[l] || []
// 								w[l].push({
// 									'gtm.start': new Date().getTime(),
// 									event: 'gtm.js'
// 								})
// 								var f = d.getElementsByTagName(s)[0],
// 									j = d.createElement(s),
// 									dl = l != 'dataLayer' ? '&l=' + l : ''
// 								j.async = true
// 								j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
// 								f.parentNode.insertBefore(j, f)
// 							})(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTAG_ID}')`
// 						}}
// 					/>
