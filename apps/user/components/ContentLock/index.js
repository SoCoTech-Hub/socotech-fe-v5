import React, { useState } from 'react'
import { isPaying } from '@/context/constants'
import Modal from '../Modal'
import Redirect from './redirect'
import SubjectButton from '../SubjectButton'
import { LockIcon } from '../SvgIcons/LockIcon'

const ContentLock = ({ bgColor = 'bg-lessonList', children }) => {
	const [open, setOpen] = useState(false)

	if (isPaying) {
		return children
	} else {
		return (
			<>
				<div
					className='m-auto py-10'
					onClick={() => setOpen(true)}
				>
					<div className={`${bgColor} rounded-full py-1 px-4`}>
						<SubjectButton
							mobilemb='mobile:mb-0'
							title='Unlock Content'
							color={'bg-compBg'}
							icon={<LockIcon className='mx-auto h-6' />}
							onClick={() => setOpen(true)}
							// color='bg-themeColorSecondary'
						/>
					</div>
				</div>

				<Modal
					open={open}
					setOpen={setOpen}
					children={<Redirect />}
				/>
			</>
		)
	}
}

export default ContentLock
