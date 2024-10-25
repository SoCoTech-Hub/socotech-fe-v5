import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MobileMenuButton from "@/components/MobileMenuButton";
import {
  ApplicationsIcon,
  BlogIcon,
  BursaryIcon,
  DashboardIcon,
  InMailIcon,
  KnowledgeBaseIcon,
  LessonIcon,
  // MainNotesIcon,
  ProfileIcon,
  ShowsIcon,
} from "@/components/SvgIcons";
import { ChevronLeftIcon } from "@/components/SvgIcons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/SvgIcons/ChevronRightIcon";
import { ForumIcon } from "@/components/SvgIcons/ForumIcon";
import {
  isPaying,
  // baseUrl,
  // Icon1,
  mainUrl,
  profileId,
} from "@/context/constants";
import getMailCount from "@/snippets/lms/getMailCount";

export const MobileNavbar = () => {
  const router = useRouter();
  const { pathname, basePath } = router;
  const [mailCount, setMailCount] = useState(0);
  let notification = false;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef(null);

  useEffect(async () => {
    setMailCount(await getMailCount({ profileId }));
  });
  if (mailCount > 0) {
    notification = true;
  }
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollButtonClick = (direction) => {
    const container = containerRef.current;
    const scrollAmount =
      direction === "right" ? container.clientWidth : -container.clientWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  return (
    <div className="fixed bottom-0 -my-1" style={{ zIndex: 200 }}>
      <div className="border-themeColorMain border-t-2"></div>
      <div className="justify-content-center flex w-full">
        <div className="">
          <div className="bg-compBg h-20 w-screen">
            <div
              className="no-scrolly w-full overflow-x-scroll"
              ref={containerRef}
            >
              <div className="flex">
                {canScrollLeft ? (
                  <button
                    className="text-themeColorMain absolute left-0 top-0 mt-1"
                    onClick={() => handleScrollButtonClick("left")}
                  >
                    <ChevronLeftIcon className="h-3 w-3" />
                  </button>
                ) : (
                  <></>
                )}
                {canScrollRight ? (
                  <button
                    className="text-themeColorMain absolute right-0 top-0 mt-1"
                    onClick={() => handleScrollButtonClick("right")}
                  >
                    <ChevronRightIcon className="h-3 w-3" />
                  </button>
                ) : (
                  <></>
                )}
                {isPaying == 0 && (
                  <MobileMenuButton
                    title="Subscribe"
                    textColor="text-themeColorMain"
                    link={`${mainUrl}/auth/subscribe?from=${basePath}`}
                    icon={
                      <img
                        src={`${basePath}/icon.gif`}
                        className="h-full w-full object-cover"
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
                  link={`${
                    basePath == "/user" ? "" : `${mainUrl}/user`
                  }/userdashboard`}
                  isActive={
                    basePath == "/user" && pathname == "/userdashboard"
                      ? true
                      : false
                  }
                />
                <MobileMenuButton
                  title="Profile"
                  textColor="text-themeColorMain"
                  icon={<ProfileIcon />}
                  dataTour="profile"
                  link={basePath == "/user" ? "/" : `${mainUrl}/user`}
                  isActive={
                    basePath == "/user" && pathname == "/" ? true : false
                  }
                />
                <MobileMenuButton
                  title="Inbox"
                  textColor="text-themeColorMain"
                  icon={<InMailIcon />}
                  dataTour="inmail"
                  link={basePath == "/inmail" ? "/" : `${mainUrl}/inmail`}
                  hasNotification={notification}
                  isActive={basePath == "/inmail" ? true : false}
                />
                <MobileMenuButton
                  title="Lessons"
                  textColor="text-themeColorMain"
                  icon={<LessonIcon />}
                  dataTour="lessons"
                  link={basePath == "/lms" ? "/" : `${mainUrl}/lms`}
                  isActive={basePath == "/lms" ? true : false}
                />
                <MobileMenuButton
                  title="Forum"
                  textColor="text-themeColorMain"
                  icon={<ForumIcon />}
                  dataTour="forums"
                  link={basePath == "/forum" ? "/" : `${mainUrl}/forum`}
                  isActive={basePath == "/forum" ? true : false}
                />
                <MobileMenuButton
                  title="Blogs"
                  textColor="text-themeColorMain"
                  icon={<BlogIcon />}
                  dataTour="blogs"
                  link={basePath == "/blog" ? "/" : `${mainUrl}/blog`}
                  isActive={basePath == "/blog" ? true : false}
                />
                <MobileMenuButton
                  title="Library"
                  textColor="text-themeColorMain"
                  icon={<KnowledgeBaseIcon />}
                  dataTour="digilib"
                  link={basePath == "/digilib" ? "/" : `${mainUrl}/digilib`}
                  isActive={
                    basePath == "/digilib" && pathname == "/" ? true : false
                  }
                />
                <MobileMenuButton
                  title="Applications"
                  textColor="text-themeColorMain"
                  icon={<ApplicationsIcon />}
                  dataTour="applications"
                  link={`${
                    basePath == "/user" ? "" : `${mainUrl}/user`
                  }/applications`}
                  isActive={
                    basePath == "/user" && pathname.includes("/applications")
                      ? true
                      : false
                  }
                />
                <MobileMenuButton
                  title="Bursaries"
                  textColor="text-themeColorMain"
                  icon={<BursaryIcon />}
                  dataTour="bursaries"
                  link={`${
                    basePath == "/user" ? "" : `${mainUrl}/user`
                  }/bursaries`}
                  isActive={
                    basePath == "/user" && pathname.includes("/bursaries")
                      ? true
                      : false
                  }
                />
                <MobileMenuButton
                  title="Shows"
                  textColor="text-themeColorMain"
                  icon={<ShowsIcon />}
                  dataTour="shows"
                  link={`${
                    basePath == "/digilib" ? "" : `${mainUrl}/digilib`
                  }/shows`}
                  isActive={
                    basePath == "/digilib" && pathname.includes("/shows")
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
