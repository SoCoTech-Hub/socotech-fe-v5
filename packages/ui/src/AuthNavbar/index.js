import Btn from "@/components/Btn";
import logout from "@/snippets/logout";

const AuthNavbar = () => (
  <nav className="navbar navbar-light bg-light justify-content-between absolute w-full py-2 shadow-md">
    <div className="pl-10">
      <img
        src=".\logo.png"
        alt=""
        className="desktop:h-14 laptop:h-14 mobile:h-10"
      />
    </div>
    <div className="mr-4 flex flex-row">
      {/* <Btn label="Help" color="bg-themeColorMain" /> */}
      <Btn
        label="Logout"
        color="bg-themeColorSecondary"
        textColor="text-white"
        onClickFunction={logout}
      />
    </div>
  </nav>
);

export default AuthNavbar;
