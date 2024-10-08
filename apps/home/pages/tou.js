import LogoOverlay from '@/components/LogoOverlay'
import { mainUrl } from '@/context/constants'
import Head from 'next/head'
import Btn from '@/components/Btn'
import { useRouter } from 'next/router'

const tou = () => {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Terms of Use</title>
				<meta
					name='description'
					content='Terms of Use Page'
				/>
			</Head>
			<div className='p-4 overflow-scroll bg-gray-200 desktop:h-full laptop:h-full mobile:h-full no-scrolly'>
				<LogoOverlay />
				<div className='p-4 bg-compBg desktop:mt-28 laptop:mt-20 mobile:mt-12 rounded-lg drop-shadow-md no-scrolly '>
					<div className='flex items-center justify-between mb-2'>
						<div className='text-xl'>Terms of Use</div>
						<div className=''>
							<Btn
								label='Back'
								color='bg-themeColorMain'
								onClickFunction={() => router.back()}
							/>
						</div>
					</div>
					<p>
						<span className='font-bold'>1. Disclaimer</span> <br />
						<p>
							This website is for information purposes only. No representations
							or warranties are given by Just Brands Africa (PTY) Ltd, Reg.
							2013/228381/07, may process in regard to any or all of the
							services contemplated by this Terms of Use directly, and/ or
							through its subsidiary SOCOTECH (PTY) Ltd, Reg. 2020/724125/07, or
							contracted third party affiliates regarding the accuracy of the
							information this website contains, any material this website
							provides for or any part of this website.
							<br />
							Any reliance by the user on any information this website contains,
							any material this website provides for or any part of this
							website, is at the user's own risk and the Just Brands Africa
							(PTY) Ltd shall not be liable in any way whatsoever in respect of
							the user or any other person, directly or indirectly, arising from
							the utilisation of the information this website contains, any
							material this website provides for or any part of this website.
							<br />
							The user hereby agrees that in the event of any dispute arising
							from the utilisation of this website in any manner, form or
							substance whatsoever, the relevant South African law will apply
							and the appropriate court(s) of The Republic of South Africa will
							have jurisdiction.
						</p>
					</p>
					<br />
					<p>
						<span className='font-bold'>2. Warranties</span> <br />
						By accessing this website, the user hereby agrees to the following:
						The use of this website is at the user's sole risk. This website is
						provided on an "as is" and "as available" basis.
						<br />
						The Just Brands Africa (PTY) Ltd gives no warranty that <br />
						<ol className='roman'>
							<li>
								the information posted on this website will meet the user's
								requirements;
							</li>
							<li>
								the information posted on this website will be uninterrupted,
								timely, secure, virus free or error free;
							</li>
							<li>
								and the information posted on this website will be accurate or
								reliable.
							</li>
						</ol>
						Any material downloaded from or otherwise obtained through this
						website is utilised at the user's own risk, and the user will,
						therefore, be liable for any and all damages of any nature
						whatsoever arising from such utilisation of the website.
					</p>
					<br />
					<p>
						<span className='font-bold'>3. Limitation of liability</span> <br />{' '}
						The user expressly understands and agrees that the Just Brands
						Africa (PTY) Ltd shall not be liable for any damages (subject to the
						provisions of Chapter 2 of the Consumer). Protection Act, 2008 (Act
						68 of 2008) (even if the Just Brands Africa (PTY) Ltd has been
						advised of the possibility of such damages) resulting from:
						<br />
						<ol className='roman'>
							<li>the use or the inability to use the website;</li>
							<li>
								the cost of procurement of substitute goods and services
								resulting from any data, information or services obtained or
								messages received or transactions entered into through the
								website;
							</li>
							<li>
								unauthorised access to or alteration of the user's transmissions
								or data;
							</li>
							<li>statements or conduct of any third party on the website;</li>
							<li> or any other matter relating to the website.</li>
						</ol>
					</p>
					<br />
					<p>
						<span className='font-bold'>4. Privacy</span>
						<br />
						The Just Brands Africa (PTY) Ltd is firmly committed to protecting
						the privacy of users of the website. For more information about the
						personal information we collect when you use the website and what we
						use it for, please read our{' '}
						<a
							href={`${mainUrl}/auth/privacy`}
							rel='noreferrer'
						>
							Privacy Policy
						</a>
						.
					</p>
					<br />
					<p>
						<span className='font-bold'>5. Child users</span>
						<br />A child user is under the age of 18 years who is not legally
						competent, without the assistance of a competent person, to take any
						action or decision in respect of any matter concerning him- or
						herself. A competent person is any person who is legally competent
						to consent to any action or decision being taken in respect of any
						matter concerning a child. The child's parent or legal guardian
						would qualify as a competent person. In order for the child to
						complete the registration process, he or she will need to get the
						consent of a competent person. Consent by a competent person will
						usually be given before or at the time of agreement, but it may also
						be given afterwards by the parent's guardian's subsequent
						ratification of the agreement. The agreement is then validated
						retroactively. The child user's consent can be withdrawn after the
						child user reaches the age of 18 years and above. The withdrawn
						consent has to be in writing and directed to Just Brands Africa
						(PTY) Ltd, Reg. 2013/228381/07, at{' '}
						<a href='mailto:privacy@suadvantage.co.za'>
							privacy@suadvantage.co.za
						</a>{' '}
						to action within reasonable time. The withdrawn consent can be
						wholly or in part in which case it needs to be specific to the
						particular action connected to the consent being withdrawn. The
						child user loses the right to cancel the agreement where the child
						or any person acting on his or her behalf, by act or omission, led
						the Company to believe that he or she had an unfettered legal
						capacity to agreement, or attempted to obscure or suppress the fact
						that the capacity was absent.
					</p>
					<br />
					<p>
						<span className='font-bold'>6. Changes to these terms</span>
						<br />
						The Just Brands Africa (PTY) Ltd reserves the right to change,
						amend, or update these terms periodically. Just Brands Africa (PTY)
						may amend the Terms of Use at any time. The amended Terms of Use
						will be posted on this website and the current notice will replace
						all previous versions of this Terms of Use. It is your
						responsibility to make yourself familiar with the content of the
						Terms of Use when you visit our website.
					</p>
					<br />
					<p>
						<span className='font-bold'>7. Modifications to the website</span>
						<br />
						The Just Brands Africa (PTY) Ltd reserves the right to modify,
						change, amend or discontinue the website (or any part thereof)
						temporarily or permanently, without prior notice.
					</p>
					<br />
					<p>
						<span className='font-bold'>8. Links</span>
						<br />
						The Just Brands Africa (PTY) Ltd may provide links to other websites
						or resources. This does not imply the Just Brands Africa (PTY) Ltd's
						endorsement of such sites. The Just Brands Africa (PTY) Ltd does not
						have any control over these websites and will, therefore, not be
						liable for any damages whatsoever arising from the utilisation of
						these websites by users. The Just Brands Africa (PTY) Ltd does not
						prohibit third-party sites to link to publicly visible content on
						this website. However, it is expressly prohibited for any third
						party to frame any page on this website in any way whatsoever
						without the prior written approval of the Just Brands Africa (PTY)
						Ltd.{' '}
					</p>
					<br />
					<p>
						<span className='font-bold'>9. Proprietary rights</span>
						<br />
						The copyright and other intellectual property rights (which include
						the Just Brands Africa (PTY) Ltd's brand, logo and creation of
						material), which are owned by or licensed to the Just Brands Africa
						(PTY) Ltd, existing in and attaching to this website, are the
						property of the Just Brands Africa (PTY) Ltd. These include but are
						not limited to text, content, design, layout, graphics,
						organisation, digital conversion and other information related to
						the website. <br /> <br /> Users are granted a non-exclusive,
						non-transferable, revocable license to:
						<ul>
							<li>
								access and use this website strictly in accordance with these
								terms;
							</li>
							<li>
								use this website solely for personal, non-commercial purposes;
							</li>
							<li>
								and download or print out or distribute content from the
								website, or any part thereof, solely for personal,
								non-commercial purposes, provided that all copyright and other
								intellectual property notices therein are unchanged.
							</li>
						</ul>
						<br />
						Any reproduction of the content of this website, or a portion
						thereof, must include the following copyright notice: ©SOCOED. Users
						who wish to use the content from this website for commercial
						purposes may only do so with prior written permission from the Just
						Brands Africa (PTY) Ltd.
					</p>
					<br />
					<p>
						<span className='font-bold'>10. How to contact us</span>
						<br />
						To contact us, send an email to{' '}
						<a href='mailto:privacy@suadvantage.co.za'>
							privacy@suadvantage.co.za
						</a>
						. <br />
						Our information officer is Francois van Louw. Contactable on{' '}
						<a href='mailto:francois@suadvantage.co.za'>
							francois@suadvantage.co.za
						</a>
						. <br /> Our information deputy is Keenan Bouwer. Contactable on{' '}
						<a href='mailto:keenan@suadvantage.co.za'>
							keenan@suadvantage.co.za
						</a>
						.
					</p>
				</div>
			</div>
		</>
	)
}

export default tou
