//USE MainMenu

import { useEffect,useState,useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {
  NavBellIcon,
  NavEventsIcon,
  NavOptionsIcon
} from '@/components/SvgIcons'
import logout from '@/snippets/logout'
import {
  AppBg,
  baseUrl,
  Logo,
  mainUrl,
  profileId,
  ProfilePic,
  Text,
  organizationId,
  orgName
} from '@/context/constants'
import GetUserNotificationNavBar from 'graphql/queries/GetUserNotificationNavBar'
import getGQLRequest from '@/snippets/getGQLRequest'
import RightSwipeDrawer from '@/components/RightSwipeDrawer'
import Avatar from '@/components/Avatar'

export const MainNavbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<boolean | null>(null)
  const [notificationCount, setNotificationCount] = useState<number>(0)
  const [eventCount, setEventCount] = useState<number>(0)
  const [affiliate, setAffiliate] = useState<boolean>(false)

  const router = useRouter()
  const { basePath } = router

  const currentDate = useMemo(() => new Date().toISOString(), [])
  const calendarEndDate = useMemo(
    () => new Date(Date.now() + 86400000 * 7).toISOString(),
    []
  )

  // GraphQL Query to get notifications and event counts
  const { loading } = useQuery(GetUserNotificationNavBar, {
    variables: {
      profileID: profileId,
      currentDate: currentDate,
      calendarEndDate: calendarEndDate
    },
    onCompleted: (data) => {
      if (data?.notificationResponsesConnection?.aggregate?.count !== notificationCount) {
        setNotificationCount(data?.notificationResponsesConnection?.aggregate?.count)
      }
      if (data?.eventResponsesConnection?.aggregate?.count !== eventCount) {
        setEventCount(data?.eventResponsesConnection?.aggregate?.count)
      }
    }
  })

  // Fetch affiliate settings once
  useEffect(() => {
    const fetchAffiliateSettings = async () => {
      const { affiliateSettings } = await getGQLRequest({
        endpoint: 'affiliateSettings',
        fields: 'isActive',
        where: `organization:${organizationId}`
      })
      if (affiliateSettings && affiliateSettings[0]?.isActive !== affiliate) {
        setAffiliate(affiliateSettings[0]?.isActive)
      }
    }
    fetchAffiliateSettings()
  }, [affiliate])

  return (
    <>
      <nav
        className={`w-full mobile:h-20 h-24 shadow-md navbar navbar-light justify-content-between z-50 bg-navbarBg ${AppBg} ${Text}`}
      >
        <div className="flex flex-row align-items-center">
          <div className="pl-6 mobile:pl-4">
            <a
              href={
                basePath == '/user'
                  ? '/user/userdashboard'
                  : `${mainUrl}/user/userdashboard`
              }
              aria-label="home"
            >
              <img
                src={Logo}
                alt=""
                className="h-14 mobile:h-8"
                data-tracking-action={`Click on ${orgName} Logo`}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-row ml-auto mr-4 space-x-4 align-middle mobile:mr-2 mobile:space-x-1.5 align-items-center">
          {/* Notifications */}
          <div
            className="relative desktop:px-3 laptop:px-3"
            data-tour="notifications"
          >
            <a
              href={
                basePath == '/support'
                  ? '/support/notifications'
                  : `${mainUrl}/support/notifications`
              }
              aria-label="notifications"
            >
              <button className="relative w-8 h-8 focus:outline-none">
                {!loading && notificationCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                <NavBellIcon className="w-8 mobile:w-6 text-themeColorMain" />
              </button>
            </a>
          </div>

          {/* Events */}
          <div
            className="relative desktop:px-3 laptop:px-3"
            data-tour="events"
          >
            <a
              href={
                basePath == '/user'
                  ? `${baseUrl}/events`
                  : `${mainUrl}/user/events`
              }
              aria-label="events"
            >
              <button className="relative w-8 h-8 focus:outline-none">
                {!loading && eventCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                <NavEventsIcon className="w-8 mobile:w-6 text-themeColorMain" />
              </button>
            </a>
          </div>

          {/* Settings Dropdown */}
          <div
            className="relative cursor-pointer desktop:px-3 laptop:px-3"
            data-tour="options"
          >
            <button
              className="w-8 mobile:w-6 text-themeColorMain focus:outline-none"
              onClick={() => setAnchorEl(!anchorEl)}
            >
              <NavOptionsIcon />
            </button>

            {anchorEl && (
              <div className="absolute right-0 w-40 mt-2 rounded-lg shadow-lg bg-compBg text-textColor">
                <div className="mt-2 ml-4 text-2xl">Settings</div>

                {affiliate && (
                  <div className="py-2">
                    <a
                      href={
                        basePath == '/user'
                          ? '/user/affiliate'
                          : `${mainUrl}/user/affiliate`
                      }
                      className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                    >
                      Affiliate Program
                    </a>
                  </div>
                )}

                <div className="py-2">
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-sm text-left text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Logout
                  </button>
                </div>

                <div className="py-1 border-t">
                  <a
                    href={`${mainUrl}/auth/tou`}
                    className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Terms of Use
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/safeguard`}
                    className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Safeguard Policy
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/copyright`}
                    className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Copyright
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/privacy`}
                    className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Privacy
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/payment`}
                    className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Payment
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={
                      basePath == '/user'
                        ? '/user/accountSettings'
                        : `${mainUrl}/user/accountSettings`
                    }
                    className="block px-4 py-2 text-sm text-textColor hover:bg-themeColorMain hover:text-textColorSecondary"
                  >
                    Account Settings
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="desktop:hidden laptop:hidden">
            <RightSwipeDrawer open={open} setOpen={setOpen} />
          </div>

          <div className="desktop:px-3 laptop:px-3">
            <a href={basePath == '/user' ? '/user' : `${mainUrl}/user`}>
              <Avatar src={ProfilePic} border={true} />
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
