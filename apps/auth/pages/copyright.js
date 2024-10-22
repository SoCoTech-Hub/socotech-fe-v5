import { useRouter } from 'next/router'
import Head from 'next/head'
import LogoOverlay from '@/components/LogoOverlay'
import Btn from '@/components/Btn'
import { SEO } from '@/components/SeoHead'

const copyright = () => {
	const router = useRouter()

	const seo = {
		title: 'Topic - Copyright Policy',
		description: `This Privacy Notice applies to personal information that Just
							Brands Africa (PTY) Ltd, Reg. 2013/228381/07, (‘Just Brands
							Africa’) may process in regard to any or all of the services
							contemplated by this notice directly, through and to the benefit
							of the platform TOPIC, or contracted third party affiliates which
							will be collected through this website: topic.co.za.`,
		image: 'https://lms.topic.co.za/auth/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
				image={seo.image}
				url={seo.url}
			/>
			<div className='overflow-scroll desktop:p-4 laptop:p-4 mobile:p-1 bg-appBg desktop:h-full laptop:h-full mobile:h-full no-scrolly'>
				<div className='mt-4 ml-2'>
					<LogoOverlay />
				</div>
				<div className='rounded-lg desktop:p-4 laptop:p-4 mobile:p-1 bg-compBg desktop:mt-28 laptop:mt-20 mobile:mt-8 drop-shadow-md no-scrolly'>
					<div className='flex items-center justify-between'>
						<div className='text-xl text-textColor'>Our Content</div>
						<div className=''>
							<Btn
								label='Back'
								color='bg-themeColorMain text-black'
								onClickFunction={() => router.back()}
							/>
						</div>
					</div>
					<div className='text-textColor text-md'>
						<br />
						<p>
							This Privacy Notice applies to personal information that Just
							Brands Africa (PTY) Ltd, Reg. 2013/228381/07, (‘Just Brands
							Africa’) may process in regard to any or all of the services
							contemplated by this notice directly, through and to the benefit
							of the platform TOPIC, or contracted third party affiliates which
							will be collected through this website: topic.co.za.
						</p>
						<br />
						<p>
							Just Brands Africa is committed to deal responsibly with your
							personal information. Just Brands Africa provide you with this
							privacy notice in order for you to make an informed decision about
							whether you want to use our website or not and/ or provide your
							personal information. The use of the website and the provision of
							any personal information is of your own volition.
						</p>
						<br />
						<p>
							Please note that by using our website you implicitly consent to
							this privacy notice and should you provide any personal
							information then you will be asked to make your consent explicit.
						</p>
						<br />
						<p>
							If you do not consent to this privacy notice you and proceed using
							the website, you consent will be taken as implicit.
						</p>
						<br />
						<span className='font-bold'>
							1. Definition of Personal Information
						</span>
						<p>
							According to the Protection of Personal Information Act No. 4 of
							2013 (hereinafter referred to as 'POPIA'), Personal information
							means information relating to an identifiable, living, natural
							person, and where it is applicable, an identifiable, existing
							juristic person, including, but not limited to –
						</p>
						<ol className='roman'>
							<li>
								Information relating to the race, gender, sex, pregnancy,
								marital status, nationality, ethnic-or social-origin, sexual
								orientation, age, physical or mental health, well-being,
								religion, conscience, belief, culture, language and birth of the
								person;
							</li>
							<li>
								Information relating to the education or the medical, financial,
								criminal or employment history of the person;
							</li>
							<li>
								Any identifying number, symbol, e-mail address, physical
								address, telephone number, location information, online
								identifier or other particular assignment to the person;
							</li>
							<li>The biometric information of the person;</li>
							<li>
								The personal opinions, views or preferences of the person;
							</li>
							<li>
								Correspondence sent by the person that is implicitly or
								explicitly of a private or confidential nature or further
								correspondence that would reveal the contents of the original
								correspondence;
							</li>
							<li>
								The views or opinions of another individual about the person;
								and
							</li>
							<li>
								The name of the person if it appears with other personal
								information relating to the person or if the disclosure of the
								name itself would reveal information about the person.
							</li>
						</ol>
						<br />
						<span className='font-bold'>
							2. How Just Brands Africa (PTY) collects, shares and stores
							information
						</span>
						<p>
							To the extent permissible under POPIA and any other applicable
							law, Just Brands Africa collects, shares and stores information
							about you and any other party whose detail you provide to us when
							you:
						</p>
						<ol className='roman'>
							<li>
								use our online services; this may include your name (including
								business name),
							</li>
							<li>address, email address and telephone number;</li>
							<li>register to use our applications;</li>
							<li>provide us with testimonials; and</li>
							<li>interact with us using social media.</li>
						</ol>
						<br />
						<p>
							The list above is non-exhaustive and may form the basis for any
							incidental processing deriving thereof.
						</p>
						<br />
						<span className='font-bold'>
							3. How Just Brands Africa (PTY) uses your information
						</span>
						<p>
							Just Brands Africa (PTY) will only use personal information that
							you provide through this website for the purposes for which you
							provided it. To the extent permissible by law and POPIA, Just
							Brands Africa (PTY) uses your information to:
						</p>
						<ol className='roman'>
							<li>
								provide any information or services that you have requested;
							</li>
							<li>
								manage and administer your use of the services you have asked us
								to provide;
							</li>
							<li>
								manage our relationship with you (for example, customer services
								and support activities);
							</li>
							<li>
								detect and prevent illegal or prohibited activities or to
								otherwise protect our legal rights (including liaison with law
								enforcement agencies for these purposes);
							</li>
							<li>
								contact you to see if you would like to take part in our
								customer research;
							</li>
							<li>
								deliver electronic communications to you which may be useful to
								you, based on your use of our services; and
							</li>
							<li>
								assist Just Brands Africa improve the functionality and content
								of the website.
							</li>
						</ol>
						<br />
						<span className='font-bold'>4. Securing your information</span>
						<p>
							Just Brands Africa has reasonable security measures in place to
							protect your personal information from loss, misuse, unauthorised
							access, being altered or being destroyed and Just Brands Africa
							regularly check our systems for vulnerabilities.
						</p>
						<br />
						<span className='font-bold'>5. Securing your information</span>
						<p>
							Our website makes use of links to other platforms such as Google,
							Facebook, Twitter, and the like, and you should be aware that
							those platforms are governed by their own privacy procedures that
							Just Brands Africa has no control over.
						</p>
						<br />
						<span className='font-bold'>6. Securing your information</span>
						<p>
							A child user is under the age of 18 years who is not legally
							competent, without the assistance of a competent person, to take
							any action or decision in respect of any matter concerning him- or
							herself.
						</p>
						<br />
						<p>
							A competent person is any person who is legally competent to
							consent to any action or decision being taken in respect of any
							matter concerning a child. The child's parent or legal guardian
							would qualify as a competent person.
						</p>
						<p>
							In order for the child to complete the registration process, which
							will be an agreement in this instance, required on this website,
							he or she will need to get the consent of a competent person.
							Consent by a competent person will usually be given before or at
							the time of agreement, but it may also be given afterwards by the
							parent's or guardian's subsequent ratification of the agreement.
							The agreement is then validated retroactively.
						</p>
						<br />
						<p>
							The child user's consent can be withdrawn after the child user
							reaches the age of 18 years and above. The withdrawn consent has
							to be in writing and directed to Just Brands Africa (PTY) Ltd,
							Reg. 2013/228381/07, at [insert email address/ physical address]
							to action within reasonable time. The withdrawn consent can be
							wholly or in part in which case it needs to be specific to the
							particular action connected to the consent being withdrawn.
						</p>
						<br />
						<p>
							The child user loses the right to set aside the agreement where
							the child or any person acting on his or her behalf, by act or
							omission, led the Just Brands Africa (PTY) Ltd, Reg.
							2013/228381/07, to believe that he or she had an unfettered legal
							capacity to agreement, or attempted to obscure or suppress the
							fact that the capacity was absent.
						</p>
						<br />
						<span className='font-bold'>7. Changes to the Privacy Notice</span>
						<p>
							Just Brands Africa (PTY) may amend this privacy notice at any
							time. The amended privacy notice will be posted on this website
							and the current notice will replace all previous versions of this
							notice. It is your responsibility to make yourself familiar with
							the content of this notice when you visit our website.
						</p>
						<br />
						<span className='font-bold '>How to contact us</span>
						<br />
						<span className='font-bold font-italic'>Information Officer:</span>
						<p>Francois van Louw</p>
						<p>E: francois@jbafrica.com</p>
						<p>T: +27 73 102 4961</p>
						<br />
						<span className='font-bold font-italic'>
							Deputy Information Officers:
						</span>
						<p>Nicholas Manuel</p>
						<p>E: nick@jbafrica.com</p>
						<p>T: +27 76 546 7153</p>
						<br />
						<p>E: info@topic.co.za</p>
						<p>T: 021-879-5803</p>
						<br />
					</div>
				</div>
			</div>
		</>
	)
}

export default copyright
