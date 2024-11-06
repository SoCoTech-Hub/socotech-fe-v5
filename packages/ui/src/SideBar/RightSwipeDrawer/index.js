import { useState } from "react";
// import LiveLessonMenu from '@/components/LiveLessonMenu'
import LessonProgressMenu from "@/components/LessonProgressMenu";
import { MainNavbar } from "@/components/MainNavbar";
import SocialLinksMenu from "@/components/SocialLinksMenu";
import SupportMenu from "@/components/SupportMenu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "transparent",
        },
      },
    },
  },
});

export default function RightDrawer({ open, setOpen }) {
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" ?? event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: (anchor === "top" ?? anchor === "bottom") ? "auto" : 250,
        hideBackdrop: true,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <button
				onClick={toggleDrawer('top', true)}
				className='z-20 w-8 h-10 p-2 text-textColor opacity-80'
			>
				<div className=''>
					<svg
						version='1.1'
						width='17'
						height='17'
						viewBox='0 0 17 17'
					>
						<g></g>
						<path
							d='M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z'
							fill='currentColor'
							stroke='currentColor'
							strokeWidth='1'
						/>
					</svg>
				</div>
			</button> */}
      <div className="mobile:m-3 card bg-navbarBg z-10">
        <MainNavbar />
        <div className="space-y-2">
          <SupportMenu setOpen={setOpen} open={open} />
          <SocialLinksMenu />
          {/* <LiveLessonMenu /> */}
          <LessonProgressMenu />
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <div className="">
        <button
          aria-label="topSwipe"
          onClick={toggleDrawer("top", true)}
          className="mobile:px-1 text-textColor h-10 w-10"
        >
          <div className="">
            <svg version="1.1" width="25" height="25" viewBox="0 0 17 17">
              <g></g>
              <path
                d="M16 3v2h-15v-2h15zM1 10h15v-2h-15v2zM1 15h15v-2h-15v2z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
        <ThemeProvider theme={theme}>
          <Drawer
            anchor={"top"}
            open={state["top"]}
            onClose={toggleDrawer("top", false)}
            // onOpen={toggleDrawer('right', true)}
            elevation={0}
            sx={{
              backdropFilter: "blur(8px) ",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
          >
            {list("top")}
          </Drawer>
        </ThemeProvider>
      </div>
    </div>
  );
}
