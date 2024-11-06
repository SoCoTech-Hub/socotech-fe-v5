import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainMenuLinkNew from "@/components/MainMenuLinkNew";
import {
  ApplicationsIcon,
  BlogIcon,
  BursaryIcon,
  DashboardIcon,
  ForumIcon,
  InMailIcon,
  KnowledgeBaseIcon,
  LessonIcon,
  LogoIcon,
  ProfileIcon,
  ShowsIcon,
} from "@/components/SvgIcons";
import { isPaying, mainUrl, profileId, Text } from "@/context/constants";
import getMailCount from "@/snippets/lms/getMailCount";

const MainMenu = () => {
  const [mailCount, setMailCount] = useState(0);

  useEffect(async () => {
    setMailCount(await getMailCount({ profileId }));
  });

  const router = useRouter();
  const { pathname, basePath } = router;

  return (
    <div>
      <div className={`bg-compBg mt-1.5 rounded-lg p-3 shadow-md ${Text}`}>
        <div className={`text-textColor mb-1.5 text-xs ${Text}`}>Menu</div>
        <div className="flex flex-initial flex-col">
          {isPaying == 0 && (
            <MainMenuLinkNew
              title="Subscribe"
              link={`/auth/subscribe?from=${basePath}`}
              activeIcon={<LogoIcon className="m-1 h-8 w-8" />}
              isActive={true}
              // animate={true}
            />
          )}
          <MainMenuLinkNew
            title="Dashboard"
            activeIcon={<DashboardIcon />}
            icon={<DashboardIcon />}
            link={`${
              basePath == "/user" ? basePath : `${mainUrl}/user`
            }/userdashboard`}
            isActive={
              basePath == "/user" && pathname == "/userdashboard" ? true : false
            }
            dataTour="dashboard"
          />
          <MainMenuLinkNew
            title="Profile"
            activeIcon={<ProfileIcon />}
            icon={<ProfileIcon />}
            dataTour="profile"
            link={basePath == "/user" ? basePath : `${mainUrl}/user`}
            isActive={basePath == "/user" && pathname == "/" ? true : false}
          />
          <MainMenuLinkNew
            title="Inbox"
            icon={<InMailIcon />}
            activeIcon={<InMailIcon />}
            dataTour="inmail"
            badgeCount={mailCount}
            link={basePath == "/inmail" ? basePath : `${mainUrl}/inmail`}
            isActive={basePath == "/inmail" ? true : false}
          />
          <MainMenuLinkNew
            title="Lessons"
            icon={<LessonIcon />}
            activeIcon={<LessonIcon />}
            dataTour="lessons"
            link={basePath == "/lms" ? basePath : `${mainUrl}/lms`}
            isActive={basePath == "/lms" ? true : false}
          />
          <MainMenuLinkNew
            title="Forum"
            icon={<ForumIcon />}
            activeIcon={<ForumIcon />}
            dataTour="forums"
            link={basePath == "/forum" ? basePath : `${mainUrl}/forum`}
            isActive={basePath == "/forum" ? true : false}
          />
          <MainMenuLinkNew
            title="Blogs"
            icon={<BlogIcon />}
            activeIcon={<BlogIcon />}
            dataTour="blogs"
            link={basePath == "/blog" ? basePath : `${mainUrl}/blog`}
            isActive={basePath == "/blog" ? true : false}
          />
          <MainMenuLinkNew
            title="Library"
            icon={<KnowledgeBaseIcon />}
            activeIcon={<KnowledgeBaseIcon />}
            dataTour="digilib"
            link={basePath == "/digilib" ? basePath : `${mainUrl}/digilib`}
            isActive={
              basePath == "/digilib" && !pathname.includes("/shows")
                ? true
                : false
            }
          />
          <MainMenuLinkNew
            title="Applications"
            activeIcon={<ApplicationsIcon />}
            icon={<ApplicationsIcon />}
            dataTour="applications"
            link={`${
              basePath == "/user" ? basePath : `${mainUrl}/user`
            }/applications`}
            isActive={
              basePath == "/user" && pathname.includes("/applications")
                ? true
                : false
            }
          />
          <MainMenuLinkNew
            title="Bursaries"
            activeIcon={<BursaryIcon />}
            icon={<BursaryIcon />}
            dataTour="bursaries"
            link={`${
              basePath == "/user" ? basePath : `${mainUrl}/user`
            }/bursaries`}
            isActive={
              basePath == "/user" && pathname.includes("/bursaries")
                ? true
                : false
            }
          />
          <MainMenuLinkNew
            title="Shows"
            icon={<ShowsIcon />}
            activeIcon={<ShowsIcon />}
            dataTour="shows"
            link={`${
              basePath == "/digilib" ? basePath : `${mainUrl}/digilib`
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
  );
};
export default MainMenu;
