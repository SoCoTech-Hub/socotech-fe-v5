import { useRouter } from 'next/router'
import { baseUrl } from '@/context/constants'

const index = ({ sendToTrash, trash }) => {
	const router = useRouter()

	return (
		<div>
			<div className='flex mt-2 desktop:pt-3 laptop:pt-3 mobile:pt-0 desktop:mb-4 laptop:mb-4 mobile:my-2'>
				<div className='mr-5 cursor-pointer'>
					<img
						src={`${baseUrl}/icons/openMail_BackArrow.svg`}
						alt='Back Arrow'
						className='w-9 h-9'
						onClick={() => router.back()}
					/>
				</div>
				{/* <div className="mr-3 cursor-pointer">
            <img src="/inmail/openMail_Box.svg" className="w-9 h-9" />
        </div>
        <div className="mr-3 cursor-pointer">
            <img src="/inmail/openMail_Warning.svg" className="w-9 h-9" />
        </div> */}

				{trash ? (
					<div className='flex mt-1 mr-6 cursor-pointer'>
						<div className=''>
							<img
								src={`${baseUrl}/icons/inmail_undoTrash.svg`}
								alt='trash'
								className='w-6 h-6'
								onClick={sendToTrash}
							/>
						</div>
						<div className='mt-1 ml-2 body-text'>Restore</div>
					</div>
				) : (
					<div className='mr-6 cursor-pointer'>
						<img
							src={`${baseUrl}/icons/openMail_Trash.svg`}
							alt='trash'
							className='w-9 h-9'
							onClick={sendToTrash}
						/>
					</div>
				)}
				{/* 
        <div className="mr-3 cursor-pointer">
          <a href="">
            <img src="/inmail/openMail_Message.svg" className="w-9 h-9" />
        </div>
        <div className="mr-3 cursor-pointer">
          <a href="">
            <img src="/inmail/openMail_Clock.svg" className="w-9 h-9" />
        </div>
        <div className="mr-6 cursor-pointer">
            <img src="/inmail/openMail_Read.svg" className="w-9 h-9" />
        </div>
        <div className="mr-3 cursor-pointer">
            <img src="/inmail/openMail_SendBox.svg" className="w-9 h-9" />
        </div>
        <div className="mr-3 cursor-pointer">
            <img src="/inmail/openMail_Flag.svg" className="w-9 h-9" />
        </div>
        <div className="mr-3 cursor-pointer">
            <img src="/inmail/openMail_Options.svg" className="w-9 h-9" />
        </div> */}
			</div>
		</div>
	)
}

export default index
