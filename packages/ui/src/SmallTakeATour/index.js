// import { CloseIcon } from "@/components/SvgIcons"
import Tour from '@/components/Tour'
import { baseUrl } from '@/context/constants'

const index = ({ setHasOpened }) => (
	<div className='w-full'>
		<div className='-mx-3 rounded-lg bg-appBg'>
			<div className=''>
				<div className=''>
					<div className='flex justify-between'>
						<div className='mobile:hidden'>
							<img
								src={`${baseUrl}/welcome-img.png`}
								alt='Welcome Image'
								className='object-contain h-40 p-8 w-52'
							/>
						</div>

						<div className='pt-12 font-bold leading-tight mobile:ml-8 mobile:pb-8 banner-main-text'>
							Need some help?
						</div>

						<div className='pt-12 mr-8 mobile:mt-10'>
							<Tour setHasOpened={setHasOpened} />
						</div>
					</div>
				</div>
				{/* <div className="">
              <div className="p-3">
                <a
                  onClick={() => {
                    setClosed(true)
                  }}
                >
                  <div className="float-right w-6 h-6 cursor-pointer ">
                    <CloseIcon />
                  </div>
                </a>
              </div>
            </div> */}
			</div>
		</div>
	</div>
)

export default index
