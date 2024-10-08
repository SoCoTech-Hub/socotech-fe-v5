import { Fragment, useState } from 'react'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
// import Box from '@mui/material/Box'
// import Modal from '@mui/material/Modal'
import { style, StyledMenu, StyledMenuItem, useStyles } from './styles'
// import { ErrorModal, FeedbackModal } from '@/components/Support'
import { useMutation } from '@apollo/client'
import NotificationReadUpdate from 'graphql/mutations/NotificationReadUpdate'
import GetNotifications from 'graphql/queries/GetNotifications'

const index = ({ notificationResponseId, notificationRead }) => {
	const classes = useStyles()
	// Modal Const's
	// const [anchorEl, setAnchorEl] = useState(null)
	// const [open, setOpen] = useState(false)
	// const [openFeedback, setOpenFeedback] = useState(false)
	// const [openTicket, setOpenTicket] = useState(false)

	// const handleModal = () => setOpen(!open)
	// const handleFeedback = () => setOpenFeedback(!openFeedback)
	// const handleCreateTicket = () => setOpenTicket(!openTicket)

	const [updateNotification] = useMutation(NotificationReadUpdate, {
		variables: { id: notificationResponseId, read: !notificationRead },
		// onCompleted: () => handleClose(),
		refetchQueries: [GetNotifications]
	})

	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget)
	// }

	// const handleClose = () => {
	// 	setAnchorEl(null)
	// }

	return (
		<div className=''>
			<IconButton
				onClick={() => updateNotification()}
				className={classes.margin}
				// disableRipple
				size='small'
			>
				<div className='rounded-lg w-8 h-8 shadow-menu'>
					{notificationRead ? (
						<img
							src='/support/mark_read.svg'
							alt='Mark as unread'
						/>
					) : (
						<img
							src='/support/checkbox.svg'
							alt='Mark as read'
						/>
					)}
				</div>
			</IconButton>
			{/* <StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				// disableRipple
				open={Boolean(anchorEl)}
				onClose={handleClose}
				style={{ zIndex: '500' }}
			>
				<StyledMenuItem
				// disableRipple
				>
					<div
						className='flex items-center justify-between '
						data-tracking-action='Marked notification as read'
					>
						<div
							className=' item'
							data-tracking-action='Marked notification as read'
						>
							<img
								src='/support/mark_read.svg'
								alt='Mark as read'
								className='w-6'
								data-tracking-action='Marked notification as read'
							/>
						</div>
						<div
							className='mr-5 item'
							data-tracking-action='Reported problem on notification'
						>
							<ListItemText
								primary={`Mark as ${notificationRead ? 'unread' : 'read'}`}
								onClick={() => updateNotification()}
							/>
						</div>
					</div>
				</StyledMenuItem>
				<StyledMenuItem
				// disableRipple
				>
					<div
						className='flex items-center justify-between'
						data-tracking-action='Reported problem on notification'
					>
						<div
							className=' item'
							data-tracking-action='Reported problem on notification'
						>
							<img
								src='/support/bug_report.svg'
								alt='Report Problem'
								className='w-6'
								data-tracking-action='Reported problem on notification'
							/>
						</div>
						<div
							className='mr-5 item'
							data-tracking-action='Reported problem on notification'
						>
							<ListItemText
								primary='Report problem to notifications team'
								onClick={handleModal}
							/>
						</div>
					</div>
				</StyledMenuItem>
			</StyledMenu> */}
			{/* <Modal
				open={open}
				onClose={handleModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box
					className='desktop:w-1/3 laptop:w-1/3 mobile:w-11/12'
					sx={style}
				>
					<div className='flex items-center justify-between align-middle'>
						<div className='text-lg font-bold'>Give us feedback</div>
						<a
							onClick={handleModal}
							className='p-1 cursor-pointer'
						>
							<img
								src='/support/modal_close.svg'
								alt='Close Modal'
								className='w-8'
							/>
						</a>
					</div>
					<hr />
					<List className='p-0'>
						<ListItem
							disablePadding
							className='gap-0'
							onClick={handleFeedback}
						>
							<ListItemButton
								sx={{
									'&:hover, &:focus': {
										borderRadius: '16px'
									}
								}}
								className='p-2'
							>
								<ListItemIcon>
									<img
										src='/support/modal_improve.svg'
										alt='Help us improve'
									/>
								</ListItemIcon>
								<ListItemText
									className='ml-4'
									primary='Help us improve the new SOCO_ED'
									secondary={
										<Fragment>
											{'Give feedback about your new SOCO_ED experience.'}
										</Fragment>
									}
								/>
							</ListItemButton>
						</ListItem>
						<ListItem
							disablePadding
							onClick={handleCreateTicket}
						>
							<ListItemButton
								sx={{
									'&:hover, &:focus': {
										borderRadius: '16px'
									}
								}}
								className='p-2'
							>
								<ListItemIcon>
									<img
										src='/support/modal_wrong.svg'
										alt='Help us improve'
									/>
								</ListItemIcon>
								<ListItemText
									className='ml-4'
									primary='Something went wrong'
									secondary={
										<Fragment>{'Let us know about a broken feature.'}</Fragment>
									}
								/>
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Modal> */}
			{/* Feedback */}
			{/* <Modal
				open={openFeedback}
				onClose={handleFeedback}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<FeedbackModal closeModal={handleFeedback} />
			</Modal> */}
			{/* Error */}
			{/* <Modal
				open={openTicket}
				onClose={handleCreateTicket}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<ErrorModal closeModal={handleCreateTicket} />
			</Modal> */}
			{/* //Discard
      <Modal open={discard} onClose={handleCreateTicket}>
        <DiscardModal closeModal={handleCreateTicket} />
      </Modal> */}
		</div>
	)
}

export default index
