//USE MainMenu

import { useEffect,useRef,useState } from 'react'
import { useRouter } from 'next/router'
import MobileMenuButton from '@/components/MobileMenuButton'
import {
  BlogIcon,
  DashboardIcon,
  InMailIcon,
  KnowledgeBaseIcon,
  LessonIcon,
  ProfileIcon,
  ApplicationsIcon,
  BursaryIcon,
  ShowsIcon,
  ForumIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@/components/SvgIcons'
import getMailCount from '@/snippets/lms/getMailCount'
import { isPaying, mainUrl, profileId } from '@/context/constants'

export const MobileNavbar: React.FC = () => {
  const router = useRouter()
  const { pathname, basePath } = router
  const [mailCount, setMailCount] = useState<number>(0)
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false)
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  let notification = mailCount > 0

  useEffect(() => {
    const fetchMailCount = async () => {
      const count = await getMailCount({ profileId })
      setMailCount(count)
    }
    fetchMailCount()
  }, [])

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const handleScroll = () => {
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        )
      }

      container.addEventListener('scroll', handleScroll)
      handleScroll()

      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollButtonClick = (direction: 'left' | 'right') => {
    const container = containerRef.current
    const scrollAmount = direction === 'right' ? container?.clientWidth ?? 0 : -(container?.clientWidth ?? 0)
    container?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 -my-1" style={{ zIndex: 200 }}>
      <div className="border-t-2 border-themeColorMain"></div>
      <div className="flex w-full justify-content-center">
        <div className="">
          <div className="w-screen h-20 bg-compBg">
            <div className="w-full overflow-x-scroll no-scrolly" ref={containerRef}>
              <div className="flex ">
                {canScrollLeft && (
                  <button
                    className="absolute top-0 left-0 mt-1 text-themeColorMain"
                    onClick={() => handleScrollButtonClick('left')}
                  >
                    <ChevronLeftIcon className="w-3 h-3" />
                  </button>
                )}
                {canScrollRight && (
                  <button
                    className="absolute top-0 right-0 mt-1 text-themeColorMain"
                    onClick={() => handleScrollButtonClick('right')}
                  >
                    <ChevronRightIcon className="w-3 h-3" />
                  </button>
                )}
                {isPaying === 0 && (
                  <MobileMenuButton
                    title="Subscribe"
                    textColor="text-themeColorMain"
                    link={`${mainUrl}/auth/subscribe?from=${basePath}`}
                    icon={
                      <img
                        src={`${basePath}/icon.gif`}
                        className="w-full h-full object-cover"
                      />
                    }
                    isActive={true}
                    animate={false}
                  />
                )}
                <MobileMenuButton
                  title="Dashboard"
                  textColor="text-themeColorMain"
                  icon={<DashboardIcon />}
                  dataTour="dashboard"
                  link={`${basePath === '/user' ? '' : `${mainUrl}/user`}/userdashboard`}
                  isActive={basePath === '/user' && pathname === '/userdashboard'}
                />
                <MobileMenuButton
                  title="Profile"
                  textColor="text-themeColorMain"
                  icon={<ProfileIcon />}
                  dataTour="profile"
                  link={basePath === '/user' ? '/' : `${mainUrl}/user`}
                  isActive={basePath === '/user' && pathname === '/'}
                />
                <MobileMenuButton
                  title="Inbox"
                  textColor="text-themeColorMain"
                  icon={<InMailIcon />}
                  dataTour="inmail"
                  link={basePath === '/inmail' ? '/' : `${mainUrl}/inmail`}
                  hasNotification={notification}
                  isActive={basePath === '/inmail'}
                />
                <MobileMenuButton
                  title="Lessons"
                  textColor="text-themeColorMain"
                  icon={<LessonIcon />}
                  dataTour="lessons"
                  link={basePath === '/lms' ? '/' : `${mainUrl}/lms`}
                  isActive={basePath === '/lms'}
                />
                <MobileMenuButton
                  title="Forum"
                  textColor="text-themeColorMain"
                  icon={<ForumIcon />}
                  dataTour="forums"
                  link={basePath === '/forum' ? '/' : `${mainUrl}/forum`}
                  isActive={basePath === '/forum'}
                />
                <MobileMenuButton
                  title="Blogs"
                  textColor="text-themeColorMain"
                  icon={<BlogIcon />}
                  dataTour="blogs"
                  link={basePath === '/blog' ? '/' : `${mainUrl}/blog`}
                  isActive={basePath === '/blog'}
                />
                <MobileMenuButton
                  title="Library"
                  textColor="text-themeColorMain"
                  icon={<KnowledgeBaseIcon />}
                  dataTour="digilib"
                  link={basePath === '/digilib' ? '/' : `${mainUrl}/digilib`}
                  isActive={basePath === '/digilib' && pathname === '/'}
                />
                <MobileMenuButton
                  title="Applications"
                  textColor="text-themeColorMain"
                  icon={<ApplicationsIcon />}
                  dataTour="applications"
                  link={`${basePath === '/user' ? '' : `${mainUrl}/user`}/applications`}
                  isActive={basePath === '/user' && pathname.includes('/applications')}
                />
                <MobileMenuButton
                  title="Bursaries"
                  textColor="text-themeColorMain"
                  icon={<BursaryIcon />}
                  dataTour="bursaries"
                  link={`${basePath === '/user' ? '' : `${mainUrl}/user`}/bursaries`}
                  isActive={basePath === '/user' && pathname.includes('/bursaries')}
                />
                <MobileMenuButton
                  title="Shows"
                  textColor="text-themeColorMain"
                  icon={<ShowsIcon />}
                  dataTour="shows"
                  link={`${basePath === '/digilib' ? '' : `${mainUrl}/digilib`}/shows`}
                  isActive={basePath === '/digilib' && pathname.includes('/shows')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
