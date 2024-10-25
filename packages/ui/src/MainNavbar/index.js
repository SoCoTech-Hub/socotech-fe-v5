import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar";
import RightSwipeDrawer from "@/components/RightSwipeDrawer";
import {
  NavBellIcon,
  NavEventsIcon,
  NavOptionsIcon,
} from "@/components/SvgIcons";
import {
  AppBg,
  baseUrl,
  Logo,
  mainUrl,
  organizationId,
  orgName,
  profileId,
  ProfilePic,
  Text,
} from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";
import logout from "@/snippets/logout";
import { useQuery } from "@apollo/client";
import GetUserNotificationNavBar from "graphql/queries/GetUserNotificationNavBar";

// import getNotificationUnreadCount from '@/snippets/lms/getNotificationUnreadCount';
// import getEventCount from '@/snippets/lms/getEventCount';

export const MainNavbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [affiliate, setAffiliate] = useState(false);
  // const currentDate = new Date().toISOString()
  // const calendarEndDate = new Date(Date.now() + 86400000 * 7).toISOString()
  // const notificationDate = new Date(Date.now() - 86400000).toISOString()
  const router = useRouter();
  const { basePath } = router;

  const currentDate = useMemo(() => new Date().toISOString(), []);
  const calendarEndDate = useMemo(
    () => new Date(Date.now() + 86400000 * 7).toISOString(),
    [],
  );

  // GraphQL Query to get notifications and event counts
  const { loading } = useQuery(GetUserNotificationNavBar, {
    variables: {
      profileID: profileId,
      currentDate: currentDate,
      calendarEndDate: calendarEndDate,
      // notificationDate: notificationDate,
    },
    onCompleted: (data) => {
      // Prevent unnecessary state updates
      if (
        data?.notificationResponsesConnection?.aggregate?.count !==
        notificationCount
      ) {
        setNotificationCount(
          data?.notificationResponsesConnection?.aggregate?.count,
        );
      }
      if (data?.eventResponsesConnection?.aggregate?.count !== eventCount) {
        setEventCount(data?.eventResponsesConnection?.aggregate?.count);
      }
      // setNotificationCount(
      // 	data?.notificationResponsesConnection?.aggregate?.count
      // )
      // setEventCount(data?.eventResponsesConnection?.aggregate?.count)
    },
  });

  // Fetch affiliate settings once
  useEffect(() => {
    const fetchAffiliateSettings = async () => {
      const { affiliateSettings } = await getGQLRequest({
        endpoint: "affiliateSettings",
        fields: "isActive",
        where: `organization:${organizationId}`,
      });
      if (affiliateSettings && affiliateSettings[0]?.isActive !== affiliate) {
        setAffiliate(affiliateSettings[0]?.isActive);
      }
    };
    fetchAffiliateSettings();
  }, [affiliate, organizationId]);

  return (
    <>
      <nav
        className={`mobile:h-20 navbar navbar-light justify-content-between bg-navbarBg z-50 h-24 w-full shadow-md ${AppBg} ${Text}`}
      >
        <div className="align-items-center flex flex-row">
          <div className="mobile:pl-4 pl-6">
            <a
              href={
                basePath == "/user"
                  ? "/user/userdashboard"
                  : `${mainUrl}/user/userdashboard`
              }
              aria-label="home"
            >
              <img
                src={Logo}
                alt=""
                className="mobile:h-8 h-14"
                data-tracking-action={`Click on ${orgName} Logo`}
              />
            </a>
          </div>
        </div>

        <div className="mobile:mr-2 mobile:space-x-1.5 align-items-center ml-auto mr-4 flex flex-row space-x-4 align-middle">
          {/* Notifications */}
          <div
            className="desktop:px-3 laptop:px-3 relative"
            data-tour="notifications"
          >
            <a
              href={
                basePath == "/support"
                  ? "/support/notifications"
                  : `${mainUrl}/support/notifications`
              }
              aria-label="notifications"
            >
              <button className="relative h-8 w-8 focus:outline-none">
                {!loading && notificationCount > 0 && (
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
                <NavBellIcon className="mobile:w-6 text-themeColorMain w-8" />
              </button>
            </a>
          </div>

          {/* Events */}
          <div className="desktop:px-3 laptop:px-3 relative" data-tour="events">
            <a
              href={
                basePath == "/user"
                  ? `${baseUrl}/events`
                  : `${mainUrl}/user/events`
              }
              aria-label="events"
            >
              <button className="relative h-8 w-8 focus:outline-none">
                {!loading && eventCount > 0 && (
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
                <NavEventsIcon className="mobile:w-6 text-themeColorMain w-8" />
              </button>
            </a>
          </div>

          {/* Settings Dropdown */}
          <div
            className="desktop:px-3 laptop:px-3 relative cursor-pointer"
            data-tour="options"
          >
            <button
              className="mobile:w-6 text-themeColorMain w-8 focus:outline-none"
              onClick={() => setAnchorEl(!anchorEl)}
            >
              <NavOptionsIcon />
            </button>

            {anchorEl && (
              <div className="bg-compBg text-textColor absolute right-0 mt-2 w-40 rounded-lg shadow-lg">
                <div className="ml-4 mt-2 text-2xl">Settings</div>

                {affiliate && (
                  <div className="py-2">
                    <a
                      href={
                        basePath == "/user"
                          ? "/user/affiliate"
                          : `${mainUrl}/user/affiliate`
                      }
                      className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
                    >
                      Affiliate Program
                    </a>
                  </div>
                )}

                <div className="py-2">
                  <button
                    onClick={logout}
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block w-full px-4 py-2 text-left text-sm"
                  >
                    Logout
                  </button>
                </div>

                <div className="border-t py-1">
                  <a
                    href={`${mainUrl}/auth/tou`}
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
                  >
                    Terms of Use
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/safeguard`}
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
                  >
                    Safeguard Policy
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/copyright`}
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
                  >
                    Copyright
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/privacy`}
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
                  >
                    Privacy
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={`${mainUrl}/auth/payment`}
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
                  >
                    Payment
                  </a>
                </div>
                <div className="py-1">
                  <a
                    href={
                      basePath == "/user"
                        ? "/user/accountSettings"
                        : `${mainUrl}/user/accountSettings`
                    }
                    className="text-textColor hover:bg-themeColorMain hover:text-textColorSecondary block px-4 py-2 text-sm"
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
            <a href={basePath == "/user" ? "/user" : `${mainUrl}/user`}>
              <Avatar src={ProfilePic} border={true} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
