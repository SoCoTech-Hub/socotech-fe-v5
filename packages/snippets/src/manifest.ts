import type { MetadataRoute } from "next";

const Manifest: MetadataRoute.Manifest = {
  id: "twa.pwa.za.co.tdponline.dev",
  name: "Talent Development Program",
  short_name: "TDP",
  description: "",
  background_color: "#fff",
  theme_color: "#81cc71",
  start_url: "https://tdponline.co.za/auth",
  dir: "ltr",
  scope: "https://tdponline.co.za",
  lang: "en",
  orientation: "any",
  display: "fullscreen",
  // permissions: {
  //   "desktop-notification": {
  //     description: "Needed for creating system notifications.",
  //   },
  // },
  // enableNotifications: true,
  // enableSiteSettingsShortcut: true,
  // isChromeOSOnly: false,
  shortcuts: [
    {
      name: "Dashboard",
      short_name: "Dashboard",
      url: "https://tdponline.co.za/user/dashboard",
      description: "Access the latest news on Topic",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/DashboardIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "Lessons",
      short_name: "Lessons",
      url: "https://tdponline.co.za/lms",
      description: "Watch short lessons on a given Topic",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/lessons.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "Mail",
      short_name: "Mail",
      url: "https://tdponline.co.za/inmail",
      description: "View your Mails",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/InMailIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "Blogs",
      short_name: "Blogs",
      url: "https://tdponline.co.za/blog",
      description:
        "Indulge in blog brilliance that'll have you hooked from the first sentence",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/BlogIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "Library",
      short_name: "Library",
      url: "https://tdponline.co.za/digilib",
      description:
        "Dive into the Library and unlock a treasure trove of brain candy that'll make your neurons do a victory dance.",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/KnowledgeBaseIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "WhatsApp Support",
      short_name: "WhatsApp",
      url: "`https://wa.me/27799196543",
      description: "Need help on TDP, we are here to help you",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/WhatsAppIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "Facebook",
      short_name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100095540883970",
      description: "See our Facebook Social Page",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/FacebookIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "Instagram",
      short_name: "Instagram",
      url: "https://www.instagram.com/topic.education?fbclid=IwAR1WYgYgvoPU4MTH0DOqWcf-dbTtWdkG8ziCNGwUnFxKUZsy6OgYUJzoCdg",
      description: "See our Instagram Social Page",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/InstagramIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
    {
      name: "TikTok",
      short_name: "TikTok",
      url: "https://www.tiktok.com/@topiceducation?is_from_webapp=1",
      description: "See our TikTok Social Page",
      icons: [
        {
          src: "https://tdponline.co.za/auth/svg/TikTokIcon.svg",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
  ],
  icons: [
    {
      src: "/auth/icons/windows11/SmallTile.scale-100.png",
      sizes: "71x71",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SmallTile.scale-125.png",
      sizes: "89x89",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SmallTile.scale-150.png",
      sizes: "107x107",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SmallTile.scale-200.png",
      sizes: "142x142",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SmallTile.scale-400.png",
      sizes: "284x284",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square150x150Logo.scale-100.png",
      sizes: "150x150",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square150x150Logo.scale-125.png",
      sizes: "188x188",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square150x150Logo.scale-150.png",
      sizes: "225x225",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square150x150Logo.scale-200.png",
      sizes: "300x300",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square150x150Logo.scale-400.png",
      sizes: "600x600",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Wide310x150Logo.scale-100.png",
      sizes: "310x150",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Wide310x150Logo.scale-125.png",
      sizes: "388x188",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Wide310x150Logo.scale-150.png",
      sizes: "465x225",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Wide310x150Logo.scale-200.png",
      sizes: "620x300",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Wide310x150Logo.scale-400.png",
      sizes: "1240x600",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/LargeTile.scale-100.png",
      sizes: "310x310",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/LargeTile.scale-125.png",
      sizes: "388x388",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/LargeTile.scale-150.png",
      sizes: "465x465",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/LargeTile.scale-200.png",
      sizes: "620x620",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/LargeTile.scale-400.png",
      sizes: "1240x1240",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.scale-100.png",
      sizes: "44x44",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.scale-125.png",
      sizes: "55x55",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.scale-150.png",
      sizes: "66x66",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.scale-200.png",
      sizes: "88x88",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.scale-400.png",
      sizes: "176x176",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/StoreLogo.scale-100.png",
      sizes: "50x50",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/StoreLogo.scale-125.png",
      sizes: "63x63",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/StoreLogo.scale-150.png",
      sizes: "75x75",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/StoreLogo.scale-200.png",
      sizes: "100x100",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/StoreLogo.scale-400.png",
      sizes: "200x200",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SplashScreen.scale-100.png",
      sizes: "620x300",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SplashScreen.scale-125.png",
      sizes: "775x375",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SplashScreen.scale-150.png",
      sizes: "930x450",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SplashScreen.scale-200.png",
      sizes: "1240x600",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/SplashScreen.scale-400.png",
      sizes: "2480x1200",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-20.png",
      sizes: "20x20",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-24.png",
      sizes: "24x24",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-30.png",
      sizes: "30x30",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-36.png",
      sizes: "36x36",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-40.png",
      sizes: "40x40",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-44.png",
      sizes: "44x44",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-48.png",
      sizes: "48x48",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-60.png",
      sizes: "60x60",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-80.png",
      sizes: "80x80",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.targetsize-256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
      sizes: "20x20",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
      sizes: "24x24",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
      sizes: "30x30",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
      sizes: "36x36",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
      sizes: "40x40",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
      sizes: "44x44",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
      sizes: "48x48",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
      sizes: "60x60",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
      sizes: "80x80",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
      sizes: "20x20",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
      sizes: "24x24",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
      sizes: "30x30",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
      sizes: "36x36",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
      sizes: "40x40",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
      sizes: "44x44",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
      sizes: "48x48",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
      sizes: "60x60",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
      sizes: "80x80",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/auth/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/auth/icons/android/android-launchericon-512-512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/auth/icons/android/android-launchericon-192-192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/auth/icons/android/android-launchericon-144-144.png",
      sizes: "144x144",
      type: "image/png",
    },
    {
      src: "/auth/icons/android/android-launchericon-96-96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/auth/icons/android/android-launchericon-72-72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/auth/icons/android/android-launchericon-48-48.png",
      sizes: "48x48",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/20.png",
      sizes: "20x20",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/29.png",
      sizes: "29x29",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/40.png",
      sizes: "40x40",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/50.png",
      sizes: "50x50",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/57.png",
      sizes: "57x57",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/58.png",
      sizes: "58x58",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/60.png",
      sizes: "60x60",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/76.png",
      sizes: "76x76",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/80.png",
      sizes: "80x80",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/87.png",
      sizes: "87x87",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/100.png",
      sizes: "100x100",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/114.png",
      sizes: "114x114",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/120.png",
      sizes: "120x120",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/128.png",
      sizes: "128x128",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/144.png",
      sizes: "144x144",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/152.png",
      sizes: "152x152",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/167.png",
      sizes: "167x167",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/180.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/auth/icons/ios/1024.png",
      sizes: "1024x1024",
      type: "image/png",
    },
  ],
  screenshots: [
    {
      src: "screenshot.jpg",
      sizes: "1280x720",
      type: "image/jpg",
    },
  ],
  related_applications: [
    {
      platform: "windows",
      url: "https://tdponline.co.za/",
      id: "pwa.za.co.tdponline",
    },
  ],
  display_override: ["window-controls-overlay"],
  prefer_related_applications: true,
  categories: ["business", "education", "finance", "government", "social"],
};
export default Manifest;
