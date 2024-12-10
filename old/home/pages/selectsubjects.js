import React from 'react'
import { baseUrl } from '@/context/constants'
import Link from 'next/link'
import BtnBig from '@/components/BtnBig'
import Checkbox from '@/components/Checkbox'
import Btn from '@/components/Btn'

const selectsubjects = () => {
	return (
		<div className='flex flex-wrap g-0'>
			<div className='w-full desktop:w-1/2 laptop:w-1/2 bg-appBg mobile:h-1/3'>
				<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center subject-bg' />
			</div>
			<div className='w-full desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 '>
				<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
					<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5'>
						<div className='w-4/5 mb-4 text-4xl font-bold text-textColor'>
							Choose your
							<br /> subjects
						</div>
						<div className='mb-5'>
							Select all available subject or simply choose only the ones you
							need.
						</div>
						<form>
							<div className='grid gap-3'>
								<BtnBig
									label='All Subjects'
									color='bg-themeColorMain'
								/>
								<BtnBig
									label='Select Subjects'
									color='bg-themeColorMain'
								/>
							</div>

							<div className='py-2 my-4 border-t-2 border-b-2 border-themeColorSecondary'>
								<div className='flex justify-between'>
									<Checkbox label='Mathematics' />
									<div className=''>R 99,00</div>
								</div>
								<div className='flex justify-between'>
									<Checkbox label='Mathematics' />
									<div className=''>R 99,00</div>
								</div>
								<div className='flex justify-between'>
									<Checkbox label='Mathematics' />
									<div className=''>R 99,00</div>
								</div>
								<div className='flex justify-between'>
									<Checkbox label='Mathematics' />
									<div className=''>R 99,00</div>
								</div>
								<div className='flex justify-between'>
									<Checkbox label='Mathematics' />
									<div className=''>R 99,00</div>
								</div>
								<div className='flex justify-between'>
									<Checkbox label='Mathematics' />
									<div className=''>R 99,00</div>
								</div>
							</div>
							<Btn
								label='Next'
								color='bg-themeColorMain'
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default selectsubjects
