import { useState, MouseEvent, KeyboardEvent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// import LiveLessonMenu from '@/components/LiveLessonMenu'
import LessonProgressMenu from '@/components/LessonProgressMenu'
import { MainNavbar } from '@/components/MainNavbar'
import SocialLinksMenu from '@/components/SocialLinksMenu'
import SupportMenu from '@/components/SupportMenu'

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'transparent'
        }
      }
    }
  }
})

interface RightDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function RightDrawer({ open, setOpen }: RightDrawerProps) {
  const [state, setState] = useState({ top: false })

  const toggleDrawer = (anchor: 'top' | 'bottom' | 'left' | 'right', open: boolean) => 
    (event: KeyboardEvent | MouseEvent) => {
      if (event && event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
        return
      }
      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: 'top' | 'bottom' | 'left' | 'right') => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        hideBackdrop: true
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="z-10 mobile:m-3 card bg-navbarBg ">
        <MainNavbar />
        <div className="space-y-2">
          <SupportMenu setOpen={setOpen} open={open} />
          <SocialLinksMenu />
          {/* <LiveLessonMenu /> */}
          <LessonProgressMenu />
        </div>
      </div>
    </Box>
  )

  return (
    <div>
      <div className="">
        <button
          aria-label="topSwipe"
          onClick={toggleDrawer('top', true)}
          className="w-10 h-10 mobile:px-1 text-textColor"
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
            anchor={'top'}
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            elevation={0}
            sx={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
          >
            {list('top')}
          </Drawer>
        </ThemeProvider>
      </div>
    </div>
  )
}
