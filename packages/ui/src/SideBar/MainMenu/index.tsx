// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import MainMenuLinkNew from '@/components/MainMenuLinkNew'
// import {
//   ForumIcon,
//   LogoIcon,
//   DashboardIcon,
//   InMailIcon,
//   KnowledgeBaseIcon,
//   LessonIcon,
//   ProfileIcon,
//   ApplicationsIcon,
//   BursaryIcon,
//   ShowsIcon,
//   BlogIcon
// } from '@/components/SvgIcons'

// import { mainUrl, Text, profileId, isPaying } from '@/context/constants'
// import getMailCount from '@/snippets/lms/getMailCount'

// const MainMenu: React.FC = () => {
//   const [mailCount, setMailCount] = useState(0)

//   useEffect(() => {
//     const fetchMailCount = async () => {
//       const count = await getMailCount({ profileId })
//       setMailCount(count)
//     }

//     fetchMailCount()
//   }, [])

//   const router = useRouter()
//   const { pathname, basePath } = router

//   return (
//     <div>
//       <div className={`bg-compBg p-3 shadow-md rounded-lg mt-1.5 ${Text}`}>
//         <div className={`text-xs text-textColor mb-1.5 ${Text}`}>Menu</div>
//         <div className="flex flex-col flex-initial">
//           {isPaying === 0 && (
//             <MainMenuLinkNew
//               title="Subscribe"
//               link={`/auth/subscribe?from=${basePath}`}
//               activeIcon={<LogoIcon className="w-8 h-8 m-1" />}
//               isActive={true}
//             />
//           )}
//           <MainMenuLinkNew
//             title="Dashboard"
//             activeIcon={<DashboardIcon />}
//             icon={<DashboardIcon />}
//             link={`${basePath === '/user' ? basePath : `${mainUrl}/user`}/userdashboard`}
//             isActive={basePath === '/user' && pathname === '/userdashboard'}
//             dataTour="dashboard"
//           />
//           <MainMenuLinkNew
//             title="Profile"
//             activeIcon={<ProfileIcon />}
//             icon={<ProfileIcon />}
//             dataTour="profile"
//             link={basePath === '/user' ? basePath : `${mainUrl}/user`}
//             isActive={basePath === '/user' && pathname === '/'}
//           />
//           <MainMenuLinkNew
//             title="Inbox"
//             icon={<InMailIcon />}
//             activeIcon={<InMailIcon />}
//             dataTour="inmail"
//             badgeCount={mailCount}
//             link={basePath === '/inmail' ? basePath : `${mainUrl}/inmail`}
//             isActive={basePath === '/inmail'}
//           />
//           <MainMenuLinkNew
//             title="Lessons"
//             icon={<LessonIcon />}
//             activeIcon={<LessonIcon />}
//             dataTour="lessons"
//             link={basePath === '/lms' ? basePath : `${mainUrl}/lms`}
//             isActive={basePath === '/lms'}
//           />
//           <MainMenuLinkNew
//             title="Forum"
//             icon={<ForumIcon />}
//             activeIcon={<ForumIcon />}
//             dataTour="forums"
//             link={basePath === '/forum' ? basePath : `${mainUrl}/forum`}
//             isActive={basePath === '/forum'}
//           />
//           <MainMenuLinkNew
//             title="Blogs"
//             icon={<BlogIcon />}
//             activeIcon={<BlogIcon />}
//             dataTour="blogs"
//             link={basePath === '/blog' ? basePath : `${mainUrl}/blog`}
//             isActive={basePath === '/blog'}
//           />
//           <MainMenuLinkNew
//             title="Library"
//             icon={<KnowledgeBaseIcon />}
//             activeIcon={<KnowledgeBaseIcon />}
//             dataTour="digilib"
//             link={basePath === '/digilib' ? basePath : `${mainUrl}/digilib`}
//             isActive={basePath === '/digilib' && !pathname.includes('/shows')}
//           />
//           <MainMenuLinkNew
//             title="Applications"
//             activeIcon={<ApplicationsIcon />}
//             icon={<ApplicationsIcon />}
//             dataTour="applications"
//             link={`${basePath === '/user' ? basePath : `${mainUrl}/user`}/applications`}
//             isActive={basePath === '/user' && pathname.includes('/applications')}
//           />
//           <MainMenuLinkNew
//             title="Bursaries"
//             activeIcon={<BursaryIcon />}
//             icon={<BursaryIcon />}
//             dataTour="bursaries"
//             link={`${basePath === '/user' ? basePath : `${mainUrl}/user`}/bursaries`}
//             isActive={basePath === '/user' && pathname.includes('/bursaries')}
//           />
//           <MainMenuLinkNew
//             title="Shows"
//             icon={<ShowsIcon />}
//             activeIcon={<ShowsIcon />}
//             dataTour="shows"
//             link={`${basePath === '/digilib' ? basePath : `${mainUrl}/digilib`}/shows`}
//             isActive={basePath === '/digilib' && pathname.includes('/shows')}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MainMenu

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  Mail,
  Menu,
  Settings,
  User,
} from "lucide-react";

import "./MainMenu.module.css";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { icon: <Home className="h-6 w-6" />, label: "Home", href: "/" },
  { icon: <User className="h-6 w-6" />, label: "Profile", href: "/profile" },
  {
    icon: <Settings className="h-6 w-6" />,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    label: "Analytics",
    href: "/analytics",
  },
  { icon: <Mail className="h-6 w-6" />, label: "Messages", href: "/messages" },
  {
    icon: <FileText className="h-6 w-6" />,
    label: "Documents",
    href: "/documents",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    label: "Calendar",
    href: "/calendar",
  },
  { icon: <HelpCircle className="h-6 w-6" />, label: "Help", href: "/help" },
  {
    icon: <Bell className="h-6 w-6" />,
    label: "Notifications",
    href: "/notifications",
  },
];

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export default function MainMenu({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {isDesktop ? (
        <aside className="w-64 overflow-y-auto bg-gray-800 p-4 text-white">
          <nav className="sticky top-0">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 rounded p-2 hover:bg-gray-700 ${
                      pathname === item.href ? "bg-gray-700" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      ) : (
        <>
          <button
            onClick={toggleMobileMenu}
            className="fixed right-4 top-4 z-20 rounded bg-gray-800 p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <nav
            className={`fixed bottom-0 left-0 right-0 bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <ul className="custom-scrollbar flex overflow-x-auto p-4">
              {menuItems.map((item) => (
                <li key={item.href} className="mx-2 flex-shrink-0">
                  <Link
                    href={item.href}
                    className={`flex w-16 flex-col items-center space-y-1 ${
                      pathname === item.href ? "text-blue-400" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="text-center text-xs">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
      <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8">{children}</main>
    </div>
  );
}
//USE:
/**import MainMenu from '@acme/ui/MainMenu'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainMenu>{children}</MainMenu>
      </body>
    </html>
  )
}**/
