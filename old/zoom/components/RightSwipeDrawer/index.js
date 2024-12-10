import { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import SupportMenu from '@/components/SupportMenu'
import LiveLessonMenu from '@/components/LiveLessonMenu'
import LessonProgressMenu from '@/components/LessonProgressMenu'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import SocialLinksMenu from '../SocialLinksMenu'

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

export default function RightDrawer({ open, setOpen }) {
	const [state, setState] = useState({
		right: false
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
				hideBackdrop: true
			}}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<button
				onClick={toggleDrawer('right', true)}
				className='absolute right-0 w-8 h-10 p-2 text-textColor rounded-l-full bg-themeColorMain bottom-24 opacity-80'
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
			</button>
			<div className='pt-2 pr-2 space-y-2 '>
				<SupportMenu
					setOpen={setOpen}
					open={open}
				/>
				{/* <LiveLessonMenu /> */}
				<SocialLinksMenu />
				<LessonProgressMenu />
			</div>
		</Box>
	)

	return (
		<div>
			<div className='absolute right-0 bottom-24'>
				<button
					aria-label='rightSwipe'
					onClick={toggleDrawer('right', true)}
					className='w-8 h-10 p-2 text-textColor rounded-l-full opacity-80 bg-themeColorMain'
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
								d='M16 3v2h-15v-2h15zM1 10h15v-2h-15v2zM1 15h15v-2h-15v2z'
								fill='currentColor'
							/>
						</svg>
					</div>
				</button>
				<ThemeProvider theme={theme}>
					<Drawer
						anchor={'right'}
						open={state['right']}
						onClose={toggleDrawer('right', false)}
						// onOpen={toggleDrawer('right', true)}
						elevation={0}
						sx={{
							backdropFilter: 'blur(8px) ',
							backgroundColor: 'rgba(255,255,255,0.1)'
						}}
						BackdropProps={{ style: { backgroundColor: 'transparent' } }}
					>
						{list('right')}
					</Drawer>
				</ThemeProvider>
			</div>
		</div>
	)
}
