import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import LessonList from '@/components/LessonList'
import { baseUrl } from '@/context/constants'

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

export default function SwipeableTemporaryDrawer() {
	const [state, setState] = useState({
		left: false
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
				className='absolute left-0 w-10 h-10 p-2 rounded-r-full text-textColor bg-themeColorMain bottom-24 opacity-80'
			>
				<img
					src={`${baseUrl}/previous_arrow.svg`}
					alt=''
					style={{ marginLeft: '-2px' }}
					className='animate-fade-in-down-l'
				/>
			</button>
			<div className='pt-2 pl-2 space-y-2 '>
				<LessonList />
			</div>
		</Box>
	)

	return (
		<div>
			<div className='absolute left-0 bottom-24'>
				<button
					onClick={toggleDrawer('left', true)}
					className='w-10 h-10 p-2 rounded-r-full text-textColor opacity-80 bg-themeColorMain'
				>
					<img
						src={`${baseUrl}/next_arrow.svg`}
						alt=''
						style={{ marginLeft: '-2px' }}
						className='animate-fade-in-down-l'
					/>
				</button>
				<ThemeProvider theme={theme}>
					<Drawer
						anchor={'left'}
						open={state['left']}
						onClose={toggleDrawer('left', false)}
						onOpen={toggleDrawer('left', true)}
						elevation={0}
						sx={{
							backdropFilter: 'blur(8px) ',
							backgroundColor: 'rgba(255,255,255,0.1)'
						}}
						BackdropProps={{ style: { backgroundColor: 'transparent' } }}
					>
						{list('left')}
					</Drawer>
				</ThemeProvider>
			</div>
		</div>
	)
}
