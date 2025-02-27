import { useRouter } from 'next/router'
import Head from 'next/head'
import LogoOverlay from '@/components/LogoOverlay'
import Btn from '@/components/Btn'

import React from 'react'

const SafeguardingPolicy = () => {
	const router = useRouter()
	return (
		// const seo = {
		// 	title: 'Topic - Policies',
		// 	description: `This Privacy Notice applies to personal information that Just
		// 						Brands Africa (PTY) Ltd, Reg. 2013/228381/07, (‘Just Brands
		// 						Africa’) may process in regard to any or all of the services
		// 						contemplated by this notice directly, through and to the benefit
		// 						of the platform TOPIC, or contracted third party affiliates which
		// 						will be collected through this website: topic.co.za.`,
		// 	image: 'https://lms.topic.co.za/auth/logo.png',
		// 	url: 'https://topic.co.za'
		// }
		<>
			{/* <Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>

				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head> */}

			<div className='overflow-scroll desktop:p-4 laptop:p-4 mobile:p-1 bg-appBg desktop:h-full laptop:h-full mobile:h-full no-scrolly'>
				<div className=''>
					<LogoOverlay />
				</div>
				<div className='rounded-lg desktop:p-4 laptop:p-4 mobile:p-1 bg-compBg desktop:mt-28 laptop:mt-20 mobile:mt-8 drop-shadow-md no-scrolly'>
					<div className='flex items-center justify-between'>
						<div className='text-xl text-textColor'>
							SOCO_ED - Just Brands Africa (PTY) Ltd - Safeguarding Policy
						</div>
						<div className=''>
							<Btn
								label='Back'
								color='bg-themeColorMain text-black'
								onClickFunction={() => router.back()}
							/>
						</div>
					</div>
					<div
						className='text-textColor'
						style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}
					>
						<span className='font-bold text-lg'>1. Purpose</span> <br />
						<p>
							Just Brands Africa (PTY) Ltd Reg. 2013/228381/07 is committed to
							creating a safe environment for children and youth (hereafter
							referred to as “youth”) involved in our programmes and services.
							This Safeguarding Policy outlines the principles guidelines and
							procedures to ensure the protection of youth from all forms of
							abuse exploitation and harm.
						</p>
						<br />
						<span className='font-bold text-lg'>2. Scope</span> <br />
						<p>
							This policy applies to all employees board members contractors
							suppliers clients volunteers and any other individuals or entities
							engaged in activities under the auspices of Just Brands Africa.
						</p>
						<br />
						<span className='font-bold text-lg '>3. Definitions</span> <br />
						<p>
							<strong>Youth:</strong> Any person under the age of 18 years.
						</p>
						<p>
							<strong>Abuse:</strong> Physical sexual emotional or exploitation
							abuse as defined in section 4 of this policy.
						</p>
						<p>
							<strong>Physical Abuse:</strong> Any act causing physical harm to
							a youth.
						</p>
						<p>
							<strong>Sexual Abuse:</strong> Any act of a sexual nature
							involving a youth.
						</p>
						<p>
							<strong>Emotional Abuse:</strong> Actions causing serious
							behavioural cognitive emotional or mental harm.
						</p>
						<p>
							<strong>Exploitation:</strong> Taking advantage of a youth for
							personal gain.
						</p>
						<p>
							<strong>Neglect:</strong> Failure to provide for the basic needs
							of a youth.
						</p>
						<p>
							<strong>Organisational Personnel:</strong> All individuals working
							or volunteering with Just Brands Africa.
						</p>
						<br />
						<span className='font-bold text-lg'>4. Principles</span> <br />
						<p>
							<strong>Zero Tolerance:</strong> Just Brands Africa has zero
							tolerance for the abuse and exploitation of youth.
						</p>
						<p>
							<strong>Best Interests:</strong> All actions concerning youth will
							prioritise their safety well-being and rights.
						</p>
						<p>
							<strong>Non-Discrimination:</strong> All youth have the right to
							protection irrespective of race gender ethnicity religion
							disability or other status.
						</p>
						<br />
						<span className='font-bold text-lg'>
							5. Prevention Measures
						</span>{' '}
						<br />
						<p>
							<strong>Policies and Procedures:</strong> Implementation of
							comprehensive safeguarding policies and procedures.
						</p>
						<p>
							<strong>Staff Selection:</strong> Rigorous screening and
							background checks for all personnel working with youth.
						</p>
						<p>
							<strong>Training:</strong> Regular training for personnel on
							safeguarding policies and procedures.
						</p>
						<p>
							<strong>Youth Engagement:</strong> Involvement of youth in
							discussions about their safety and well-being.
						</p>
						<br />
						<span className='font-bold text-lg'>
							6. Reporting and Response
						</span>{' '}
						<br />
						<p>
							<strong>Reporting Mechanisms:</strong> Establishment of
							confidential and accessible reporting channels for youth to report
							concerns.
						</p>
						<p>
							<strong>Response Plan:</strong> Immediate investigation and
							response to any reported incidents of abuse or exploitation.
						</p>
						<p>
							<strong>Support:</strong> Provision of support and protection for
							youth involved in any reported incidents.
						</p>
						<br />
						<span className='font-bold text-lg'>
							7. Specific Responsibilities
						</span>{' '}
						<br />
						<p>
							<strong>Board of Directors:</strong> Ultimate accountability for
							safeguarding within the organisation.
						</p>
						<p>
							<strong>Chief Executive Officer:</strong> Ensuring the
							implementation and compliance with this policy.
						</p>
						<p>
							<strong>Information Officer:</strong> Handling reports of abuse
							and ensuring adherence to legal and policy requirements.
						</p>
						<p>
							<strong>All Personnel:</strong> Adhering to safeguarding policies
							reporting concerns and undergoing regular training.
						</p>
						<br />
						<span className='font-bold text-lg'>8. Code of Conduct</span> <br />
						<p>
							<strong>Prohibited Actions:</strong> Abuse exploitation
							discrimination or any form of harm towards youth.
						</p>
						<p>
							<strong>Required Actions:</strong> Respectful and protective
							behaviour maintaining professional boundaries and reporting any
							concerns or suspicions of abuse.
						</p>
						<br />
						<span className='font-bold text-lg'>
							9. Implementation and Monitoring
						</span>{' '}
						<br />
						<p>
							<strong>Regular Reviews:</strong> Periodic review and update of
							the safeguarding policy to ensure its effectiveness.
						</p>
						<p>
							<strong>Monitoring:</strong> Continuous monitoring of safeguarding
							practices and compliance within the organisation.
						</p>
						<br />
						<span className='font-bold text-lg'>10. Informed Consent</span>{' '}
						<br />
						<p>
							<strong>Youth Participation:</strong> Ensuring that youth are
							informed about and consent to participation in programmes and
							activities.
						</p>
						<p>
							<strong>Use of Personal Information:</strong> Obtaining written
							consent for the use of personal information and images of youth.
						</p>
						<br />
						<span className='font-bold text-lg'>11. Confidentiality</span>{' '}
						<br />
						<p>
							<strong>Data Protection:</strong> Safeguarding personal
							information of youth and ensuring it is only disclosed in
							accordance with legal requirements and organisational policies.
						</p>
						<br />
						<span className='font-bold text-lg'>
							12. Disciplinary Action
						</span>{' '}
						<br />
						<p>
							<strong>Sanctions:</strong> Immediate suspension and potential
							termination of personnel found guilty of abuse or exploitation.
						</p>
						<p>
							<strong>Legal Action:</strong> Referral to law enforcement
							agencies for criminal investigation if necessary.
						</p>
						<br />
						<span className='font-bold text-lg'>How to Contact Us</span> <br />
						<p>
							<strong>Information Officer:</strong> Francois van Louw
							<br />
							E:{' '}
							<a href='mailto:francois@jbafrica.com'>francois@jbafrica.com</a>
							<br />
							T: +27 73 102 4961
						</p>
						<br />
						<strong>Deputy Information Officers:</strong>
						<p>
							Nicholas Manuel
							<br />
							E: <a href='mailto:nick@jbafrica.com'>nick@jbafrica.com</a>
							<br />
							T: 021-879-5803
						</p>
						<p>
							<br />
							E: <a href='mailto:info@topic.co.za'>info@topic.co.za</a>
							<br />
							T: +27 63 802 2173
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default SafeguardingPolicy
