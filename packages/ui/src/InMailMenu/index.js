import IMComposeButton from './IMComposeButton'
import IMMenuList from './IMMenuList'

const index = ({ setMenu, userID, sentMails, refetchMails }) => {
	return (
		<div className={`p-auto rounded-lg shadow-card bg-compBg`}>
			{/* <div className='mb-4'>
				<IMComposeButton
					link='#'
					disabled={true}
					userID={userID}
					sentMails={sentMails}
					refetchMails={refetchMails}
				/>
			</div> */}
			<div className='flex justify-center bg-compBg rounded-lg'>
				<IMMenuList setMenu={setMenu} />
			</div>
		</div>
	)
}

export default index
