import { useRouter } from 'next/router'
import DigilibLoad from '@/components/DigilibLoad'
import Btn from '@/components/Btn'
import downloadHTMLLink from '@/snippets/lms/downloadHTMLLink'
import { isPaying } from '@/context/constants'

const index = ({
	name,
	loading,
	category,
	subject,
	downloadLink,
	download = false
}) => {
	const router = useRouter()

	// const data = useQuery(GetKBDownload, {
	// 	variables: { knowledgeBaseID: knowledgeBaseID },
	// 	fetchPolicy: 'network-only'
	// })

	return (
		<div className='flex flex-row justify-between w-full p-3 rounded-lg bg-themeColorMain shadow-menu'>
			<div className=''>
				<div className='grid content-center my-2 align-middle ml-28 desktop:hidden laptop:hidden'>
					<DigilibLoad loading={Boolean(loading)} />
				</div>
				<div className='pt-2 pb-1 pl-4 text-4xl font-bold leading-tight text-black mobile:text-xl'>
					{name}
				</div>
				<div className='pb-3 pl-4 text-xl leading-tight text-black mobile:text-sm'>
					{category} {subject}
				</div>
				<div className='flex flex-wrap mobile:gap-1 text-textColor'>
					<Btn
						label='Back to List'
						onClickFunction={() => router.back()}
						color='bg-compBg text-white'
					/>
					{download && isPaying ? (
						<Btn
							label='Download'
							onClickFunction={() => downloadHTMLLink(downloadLink, name)}
							color='bg-compBg text-white'
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className='flex items-center pr-4 align-middle mobile:hidden'>
				<DigilibLoad loading={loading} />
			</div>
		</div>
	)
}

export default index
