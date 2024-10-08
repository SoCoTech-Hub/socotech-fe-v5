import LogoOverlay from '@/components/LogoOverlay'
import { mainUrl } from '@/context/constants'
import Head from 'next/head'
import Btn from '@/components/Btn'
import { useRouter } from 'next/router'

const privacy = () => {
	const router = useRouter()

	const seo = {
		title: 'Topic - Privacy Policy',
		description: `The Just Brands Africa (PTY) is committed to deal responsibly with
						your personal information. Just Brands Africa (PTY) provide you with
						this privacy notice in order for you to make an informed decision
						about whether you want to use our website or not and/ or provide
						your personal information. The use of the website is of your own
						volition and the provision of any personal information.`,
		image: 'https://lms.topic.co.za/auth/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			<Head>
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
			</Head>
			<div className='overflow-scroll desktop:p-4 laptop:p-4 mobile:p-1 bg-appBg desktop:h-full laptop:h-full mobile:h-full no-scrolly'>
				<LogoOverlay />
				<div className='rounded-lg bg-compBg desktop:mt-28 laptop:mt-20 mobile:mt-8 drop-shadow-md no-scrolly text-textColor desktop:p-4 laptop:p-4 mobile:p-1'>
					<div className='flex items-center justify-between mb-2'>
						<div className='text-xl font-bold '>Privacy Policy</div>
						<div className=''>
							<Btn
								label='Back'
								color='bg-themeColorMain text-black'
								onClickFunction={() => router.back()}
							/>
						</div>
					</div>
					<p>
						This Privacy Notice applies to personal information that Just Brands
						Africa (PTY) Ltd, Reg. 2013/228381/07, may process in regard to any
						or all of the services contemplated by this policy directly, or
						through its subsidiary SOCOTECH (PTY) Ltd, Reg. 2020/724125/07, or
						contracted third party affiliates which will be collected through
						this website:{' '}
						<a
							href={`${mainUrl}`}
							target='_blank'
							rel='noopener noreferrer'
						>{`${mainUrl}`}</a>{' '}
						('website').
						<br />
						The Just Brands Africa (PTY) is committed to deal responsibly with
						your personal information. Just Brands Africa (PTY) provide you with
						this privacy notice in order for you to make an informed decision
						about whether you want to use our website or not and/ or provide
						your personal information. The use of the website is of your own
						volition and the provision of any personal information.
						<br />
						Please note that by using our website you implicitly consent to this
						privacy notice and should you provide any personal information then
						you will be asked to make your consent explicit. <br /> <br />
						If you do not consent to this privacy notice you must stop using our
						website.
					</p>
					<div className='py-3'>
						<hr />
					</div>
					<p>
						<span className='font-bold'>1. Purpose</span> <br />
						This Privacy Policy applies to personal information that Just Brands
						Africa (PTY) Ltd, Reg. 2013/228381/07, (‘Just Brands Africa’ or
						‘Company’) may process in regard to any or all of the services
						contemplated by this notice directly, through and to the benefit of
						the platform TOPIC, or contracted third party affiliates which will
						be collected.
						<br />
						This policy also serves to protect the Company from compliance risks
						associated with the protection of personal information which
						includes:
						<ol className='roman'>
							<li>Breaches of confidentiality;</li>
							<li>
								Failing to offer choice to Data subjects to choose how and for
								what purpose their information is used for;
							</li>
							<li>Reputational damage;</li>
							<br />
							The policy also demonstrates the Company’s commitment to
							protecting the privacy rights of Data subjects.
						</ol>
					</p>
					<br />
					<p>
						<span className='font-bold'>2. Scope</span>
						<br />
						This document applies to the Company’s Board of Directors, all
						employees, contractors, suppliers, clients, persons acting on behalf
						of the company and all potential and existing Data subjects.
					</p>
					<br />
					<p>
						<span className='font-bold'>3. Introduction</span> <br />
						The Protection of Personal Information Act, 4 of 2013 (‘POPIA’)
						requires the Company to inform Data subjects as to how their
						personal information is used, collected, disclosed and destroyed.
						<br />
						<br />
						The Company is committed to compliance with POPIA and other
						applicable legislation, protecting the privacy of Data subjects and
						ensuring that their personal information is used appropriately,
						transparently and securely.
						<br />
						<br />
						This policy is made available on the Company’s website topic.co.za
						and should be read in conjunction with the Company’s Website Privacy
						Notice.
					</p>
					<br />
					<p>
						<span className='font-bold'>4. Definitions</span> <br />
						<span className='font-bold'>4.1 Personal Information</span> <br />
						Personal information means information relating to an identifiable,
						living, natural person, and where it is applicable, an existing,
						identifiable juristic person and may include but is not limited to:{' '}
						<br />
						<ol className='roman'>
							<li>
								information relating to the race, gender, sex, pregnancy,
								marital status, nationality, ethnic- or social- origin, colour,
								sexual orientation, age, physical or mental health, well-being,
								disability, religion, conscience, belief, culture, language and
								birth of the person; ;
							</li>
							<li>
								information relating to the education or the medical, financial,
								criminal or employment history of the person;
							</li>
							<li>
								any identifying number, symbol, e-mail address, physical
								address, telephone number, location information, online
								identifier or other particular assignment to the person;
							</li>
							<li>the biometric information of the person;</li>
							<li>
								the personal opinions, views or preferences of the person;
							</li>
							<li>
								correspondence sent by the person that is implicitly or
								explicitly of a private or confidential nature or further
								correspondence that would reveal the contents of the original
								correspondence;
							</li>
							<li>
								information regarded as confidential business information;
							</li>
							<li>
								the views or opinions of another individual about the person;
								and
							</li>
							<li>
								the name of the person if it appears with other personal
								information relating to the person or if the disclosure of the
								name itself would reveal information about the person.
							</li>
							<br />
						</ol>
					</p>
					<span className='font-bold'>4.2. Data subject</span> <br />
					<p>
						This refers to the natural or juristic person to whom personal
						information relates, such as employees, clients, delegates,
						sub-contractors or a company that supplies the Company with goods or
						services.
					</p>
					<br />
					<span className='font-bold'>4.3. Breach</span> <br />
					<p>
						A breach of security leading to the accidental or unlawful
						destruction, loss, alteration, unauthorised disclosure of, or access
						to, personal data transmitted, stored or otherwise processed.
					</p>
					<br />
					<span className='font-bold'>4.4. Processing</span> <br />
					<p>
						A breach of security leading to the accidental or unlawful
						destruction, loss, alteration, unauthorised disclosure of, or access
						to, personal data transmitted, stored or otherwise processed. <br />
						<ol className='roman'>
							<li>
								the collection, receipt, capturing, collation, storage,
								updating, retrieval, alteration or use;
							</li>
							<li>
								dissemination by means of transmission, distribution or making
								available in any other form; or
							</li>
							<li>merging, linking, erasure or destruction of information.</li>
						</ol>
						<br />
					</p>
					<span className='font-bold'>
						4.5. Processing of children's personal information
					</span>
					<p>
						A child will be understand stood as a natural person under the age
						of 18 years of age. A competent person would be someone who is
						either the child's parent, adoptive or biological, or legal guardian
						who can act on behalf of the child.
						<br /> The Company will process data of children is only if:
						<ol className='roman'>
							<li>
								it is carried out with the prior consent of a competent person;
							</li>
							<li>
								it is necessary for the establishment, exercise or defence of a
								right or obligation in law;
							</li>
							<li>
								it is necessary to comply with an obligation of international
								public law;
							</li>
							<li>
								it is for historical, statistical or research purposes; or
							</li>
							<li>
								it is of personal information which has deliberately been made
								public by the child with the consent of a competent person.
							</li>
						</ol>
						<br />
					</p>
					<br />
					<p>
						<span className='font-bold'>5. Rights of data subjects</span> <br />
						The Company will ensure that it makes Data subjects aware of their
						rights as appropriate and specifically with regards to the
						following: <br />
						<span className='font-bold'>
							5.1. The right to access personal information
						</span>
						<br />
						<p>
							Data subjects have the right to establish whether the Company
							holds personal information related to them, including the right to
							request access to that personal information.
						</p>
						<br />
						<span className='font-bold'>
							5.2. The right to have personal information corrected or deleted
						</span>
						<br />
						<p>
							Data subjects also have the right to ask the Company to update,
							correct or delete their personal information on reasonable
							grounds.
						</p>
						<br />
						<span className='font-bold'>
							5.3. The right to object to the processing of personal information
						</span>
						<br />
						<p>
							Data subjects have the right on reasonable grounds, to object to
							the processing of their personal information. <br /> The Company
							will consider such requests and the requirements of POPIA and may
							cease to process such personal information and may, subject to
							statutory and contractual record keeping requirements, also
							destroy the personal information.
						</p>
						<br />
						<span className='font-bold'>
							5.4. The right to object to direct marketing
						</span>
						<br />
						<p>
							Data subjects have the right to object to their personal
							information being used for the purposes of direct marketing by
							means of unsolicited electronic communications.
						</p>
						<br />
						<span className='font-bold'>
							5.5. The right to complain to the Information Regulator
						</span>
						<br />
						<p>
							Data subjects have the right to submit a complaint to the
							Information Regulator regarding infringements of any of their
							rights protected under POPIA and to institute civil proceedings
							against alleged non-compliance with the protection of their
							personal information.
						</p>
						<br />
						<span className='font-bold'>5.6. The right to be informed</span>
						<br />
						<p>
							Data subjects have the right to be informed that their personal
							information is being collected by the Company and should also be
							notified in any situation where the Company reasonably believe
							that the personal information of data subjects has been accessed
							by unauthorised person/s.
						</p>
						<br />
					</p>
					<br />
					<p>
						<span className='font-bold'>6. General principles</span> <br />
						All employees and persons acting on behalf of the Company will be
						subject to the following guiding principles: <br />
						<span className='font-bold'>6.1. Accountability</span>
						<br />
						<p>
							Compliance failure could damage the reputation of the company and
							its shareholder, the Company. The Company could also be exposed to
							a civil claim for damages. The protection of personal information
							is therefore everybody’s responsibility. <br /> <br />
							<p>
								The Company will take appropriate steps including disciplinary
								action against individuals who through intentional or negligent
								actions and/or omissions fail to comply with this policy.
							</p>
						</p>
						<br />
						<span className='font-bold'>6.2. Processing limitation</span>
						<br />
						<p>
							The Company collects personal information directly from Data
							subjects only as pertains to business requirements. The type of
							information will depend on the need for which it is collected and
							will be processed for that purpose only. Just Brands Africa (PTY)
							Ltd will inform Data subjects as to what information is mandatory
							or deemed optional, as far as possible.
						</p>
						<br />
						<p>
							Personal information will only be used for the purpose for which
							it was collected, intended and as agreed. This may include:
							<br />
							<ol className='roman'>
								<li>Registering delegates on training courses;</li>
								<li>
									Issuing certificates to delegates upon successful completion
									of training courses;
								</li>
								<li>Issuing tax certificates to subcontractors;</li>
								<li>Recruitment activities of students and employees;</li>
								<li>Record keeping and payment of employees;</li>
								<li>Administration of employment benefits;</li>
								<li>Recording and payment of suppliers;</li>
								<li>Confirming, verifying and updating client information;</li>
								<li>
									For registration purposes with statutory bodies (CIPC, SARS)
									and institutions (banks);
								</li>
								<li>Contractual obligations;</li>
								<li>In connection with legal proceedings;</li>
								<li>
									In connection with and to comply with legal and regulatory
									requirements or when allowed by law;
								</li>
								<li>For audit and reporting purposes; and</li>
								<li>
									Marketing activities as provided in POPIA and the Consumer
									Protection Act 68 of 2008 ('CPA').
								</li>
							</ol>
						</p>
						<br />
						<p>
							According to Section 10 of POPIA, personal information may only be
							processed if the purpose for which it is processed, is adequate,
							relevant and not excessive. Certain conditions must be met for the
							Company to process personal information as in Section 11 of POPIA.
							These are listed below: <br />
						</p>
						<ol className='roman'>
							<li>
								Data subjects consent to the processing – consent is obtained
								during early stages of the relationship.
							</li>
							<li>
								Processing is necessary – personal information is required to
								facilitate the provision of services to the Data subject or for
								the conclusion of a contract to which the Data subject is a
								party.
							</li>
							<li>The Company is under obligation by law.</li>
							<li>
								The legitimate interest of the Data subject is protected – it is
								in their best interest to provide the personal information.
							</li>
							<li>
								Processing is in the best interest of the Company – in order to
								provide our services to the Data subject.
							</li>
						</ol>
						<br />
						<span className='font-bold'>
							6.3. Further processing limitation
						</span>
						<br />
						<p>
							Personal information will not be processed for a secondary purpose
							unless that processing is compatible with the original purpose.
							Where the secondary purpose is not compatible with the original
							purpose, the Company will first obtain additional consent from the
							Data subject.
						</p>
						<br />
						<span className='font-bold'>6.4. Information quality</span>
						<br />
						<p>
							The Company will take reasonable steps to ensure that all personal
							information is complete, accurate and not misleading. Where
							personal information is collected from third parties, the Company
							will take reasonable steps to ensure that the information is
							correct by verifying the accuracy of the information directly with
							the Data subject or by way of independent sources.
						</p>
						<br />
						<span className='font-bold'>6.5. Security safeguards</span>
						<br />
						<p>
							Section 19 of POPIA requires the adequate protection of personal
							information that is held by the Company. The Company will
							continuously review security controls and processes to prevent
							unauthorised access and use of personal information. <br /> The
							following procedures are in place to ensure that personal
							information are secure:
						</p>
						<ol className='roman'>
							<li>
								This policy is available from the Company’s website and
								Intranet;
							</li>
							<li>Employees will be trained on this policy and POPIA;</li>
							<li>
								All product marketing activities using email addresses derived
								from leads capturing or enrolment data, unsolicited proposals
								and letter campaigns must be distributed through the
								ClickDimensions marketing platform to ensure subscription
								consent compliance. Marketing mail mergers from personal
								individual inboxes are not allowed.
							</li>
							<li>
								Reputable Just Brands Africa (PTY) Ltds must be used for the
								purchase or acquisition of databases for marketing purposes. In
								addition, databases may only be acquired if the provider can
								provide certification of assurances that they have obtained
								permission from prospects/customers to on-sell their information
								and that they accept legal liability for any misrepresentation
								thereof.
							</li>
							<li>
								Redundant hardcopies of personal information are stored in
								locked bins until it is securely destroyed by our Just Brands
								Africa (PTY) Ltd;
							</li>
							<li>
								Archived personal information are destroyed according to
								legislative retention periods;
							</li>
							<li>
								The Company’s internal server hard drives are protected by
								firewalls; and
							</li>
							<li>
								The backup of electronic files and data are managed and
								regulated through a service
							</li>
							<li>
								level agreement entered into with a reputable service provider.
							</li>
						</ol>
					</p>
					<br />
					<p>
						<span className='font-bold'>
							7. Specific duties and responsibilities
						</span>
						<br />
						<span className='font-bold'>7.1. Board of Directors</span>
						<br />
						<p>
							The Company’s Board of Directors is ultimately accountable for
							ensuring that the Company meets its obligations under POPIA. The
							Board of Directors may however delegate some of its
							responsibilities to management or other capable individuals.
						</p>
					</p>
					<br />
					<p>
						<span className='font-bold'>7.2. Chief Executive Officer</span>
						<br />
						<p>
							The Chief Executive Officer is by virtue of the position,
							appointed automatically as Information Officer in terms of the
							Promotion of Access to Information Act and POPIA and may authorise
							any person in the Company to act as the Information Officer of the
							Company. The CEO however retains the responsibility and
							accountability for any powers or the functions authorised to that
							person and has the right to amend and/or withdraw any of these
							powers, duties and responsibilities.
						</p>
						<br />
						<span className='font-bold'>
							7.3. The Company’s Information Officer is responsible for the
							following:
						</span>
						<br />
						<ol className='roman'>
							<li>
								Taking steps to ensure the Company’s reasonable compliance to
								POPIA;
							</li>
							<li>
								Reviewing the Company’s information protection procedures and
								policies;
							</li>
							<li>
								Ensuring that the Company makes it convenient for Data subjects
								to communicate with the Company regarding their personal
								information;
							</li>
							<li>
								Encourage compliance with the lawful processing of personal
								information;
							</li>
							<li>
								Ensure that employees and persons acting on behalf of the
								Company are aware of the risks associated with the processing of
								personal information;
							</li>
							<li>
								Ensure that employees are trained in the processing of personal
								information;
							</li>
							<li>Address employees’ POPIA related questions;</li>
							<li>
								Address POPIA related requests and complaints made by the
								Company’s Data subjects; and
							</li>
							<li>
								Act as contact point for the Information Regulator on issues
								pertaining to the processing of personal information.
							</li>
						</ol>
						<br />
						<span className='font-bold'>
							7.4. The Company’s Executive Manager in charge of Information
							Technology is responsible for:
						</span>
						<br />
						<ol className='roman'>
							<li>
								Ensuring that the Company’s IT infrastructure and any other
								devices used for processing personal information meet acceptable
								security standards;
							</li>
							<li>
								Ensuring that servers containing personal information are sited
								in a secure location;
							</li>
							<li>
								Ensuring that all electronically stored information is backed-up
								and tested on a regular basis;
							</li>
							<li>
								Ensuring that all back-ups are protected from unauthorised
								access, accidental deletion and malicious hacking attempts;
							</li>
							<li>
								Ensuring that information being transferred electronically is
								encrypted;
							</li>
							<li>
								Ensuring that all servers and computers containing personal
								information are protected by a firewall and the latest security
								software;
							</li>
							<li>
								Performing regular IT audits to ensure that the security of the
								Company’s hardware and software systems are functioning
								properly;
							</li>
							<li>
								Performing regular IT audits to verify whether electronically
								stored personal information has been accessed or acquired by
								unauthorised persons; and
							</li>
							<li>
								Performing a proper due diligence review prior to contracting
								with third party providers to process personal information on
								the Company’s behalf.
							</li>
						</ol>
						<br />
						<span className='font-bold'>
							7.5. Employees and other persons acting on behalf of the Company
							are responsible for:
						</span>
						<br />
						<ol className='roman'>
							<li>
								Keeping all personal information that they come into contact
								with secure by taking precautions and complying with this
								policy;
							</li>
							<li>
								Ensuring that personal information is kept in as few places as
								is necessary;
							</li>
							<li>
								Ensuring that personal information is encrypted prior to sharing
								the information electronically;
							</li>
							<li>
								Ensuring that all devices such as computers, flash drives, etc.
								are password protected and never left unattended (refer to the
								Company’s Electronic Communications policy);
							</li>
							<li>
								Ensure that computer screens and other devices are switched off
								when not in use;
							</li>
							<li>
								Ensure that removable storage devices such as external drives
								that contain personal information are locked away securely when
								not being used;
							</li>
							<li>
								Ensure that where personal information is stored on paper, that
								such hard copies are kept in a secure place where unauthorised
								persons are not able to access it;
							</li>
							<li>
								Ensure that where personal information has been printed out,
								that the printouts are not left unattended where unauthorised
								individuals could see them;
							</li>
							<li>
								Take reasonable steps to ensure that personal information is
								stored only for as long as it is needed or required;
							</li>
							<li>Undergo POPIA awareness training from time to time.</li>
							<li>
								Employees and other persons acting on behalf of the company will
								under not circumstances:
							</li>
							<li>
								Process personal information where it is not a requirement to
								perform their workrelated duties;
							</li>
							<li>
								Save copies of personal information directly to their own
								private computers or mobile devices; and
							</li>
							<li>Share personal information informally.</li>
						</ol>
						<br />
						<span className='font-bold'>8. Data breach procedure</span>
						<br />
						<span className='font-bold'>8.1. Reporting a possible breach</span>
						<br />
						<p>
							Any employee who becomes aware of a possible breach of Personal
							Information must immediately inform their line manager and the
							Information Officer and/or the Deputy Information Officers.
						</p>
						<br />
						<p>
							The employee must ensure to retain any evidence they have in
							relation to the breach and provide a written statement setting out
							any relevant information relating to the suspected data breach
							using the Data Breach Record.
						</p>
						<br />
						<p>
							The employee must ensure to retain any evidence they have in
							relation to the breach and provide a written statement setting out
							any relevant information relating to the suspected data breach
							using the Data Breach Record.
						</p>
						<br />
						<span className='font-bold'>8.2. Response plan</span>
						<br />
						<p>
							The Company’s CEO,the Information Officer, or designated deputy
							Information Officer will assemble a team to investigate, manage
							and respond to the data breach.
						</p>
						<br />
						The breach team will then:
						<br />
						<ol className='roman'>
							<li>
								Make an urgent preliminary assessment of what data have been
								lost, why and how.
							</li>
							<li>
								Take immediate steps to contain the breach and recover any lost
								data.
							</li>
							<li>Undertake a full and detailed assessment of the breach.</li>
							<li>Record the breach in the company’s data breach register.</li>
							<li>Notify the Information Regulator, if necessary.</li>
							<li>Notify affected data subjects, if necessary.</li>
							<li>
								Put in place any measures to address it and to mitigate its
								possible adverse effects and to prevent further breaches.
							</li>
						</ol>
						<br />
						<span className='font-bold'>9. Data breach register</span>
						<br />
						<p>
							The company will maintain a register of all personal data breaches
							regardless of whether or not it is notifiable to the Information
							Regulator. The register will include a record of:
						</p>
						<ol className='roman'>
							<li>
								The facts relating to the breach including the cause, what
								happened and what personal data were effected;
							</li>
							<li>the effects of the breach; and</li>
							<li>
								the remedial actions Just Brands Africa (PTY) Ltd have taken.
							</li>
						</ol>
						<br />
						<span className='font-bold'>
							10. Notification to the Information Regulator
						</span>
						<p>
							Not all personal data breaches have to be notified to the
							Information Regulator. The breach will only have to be notified if
							it is likely to result in a risk to the rights and freedoms of
							data subjects and this will be assessed by the company on a
							case-by-case basis.
						</p>
						<br />
						<span className='font-bold'>
							11. Notifications to data subjects
						</span>
						<p>
							The data breach team will consider several factors in determining
							the notifications to individuals affected by the data breach
							including but not limited to:
						</p>
						<ol className='roman'>
							<li>Contractual obligations;</li>
							<li>
								Risk of identity theft or fraud because of the type of
								information lost such as contact details, bank information or
								identity numbers;
							</li>
							<li>Risk of physical harm;</li>
							<li>
								Risk of hurt, humiliation or damage to reputation if the
								information includes medical or disciplinary records; and
							</li>
							<li>Number of data subjects affected.</li>
						</ol>
						<br />
						<p>
							Affected individuals must be notified without unreasonable delay,
							unless such notification will impair a criminal investigation.
							Notices must be in plain language and include basic information
							such as what happened, type of information involved, steps being
							taken, steps individuals should take and contact information.
						</p>
						<br />
						<span className='font-bold'>12. Disciplinary action</span>
						<p>
							The Company may recommend appropriate legal or disciplinary action
							to be taken against any employee found to be implicated in any
							non-compliant activity outlined within this policy.
						</p>
						<p>
							Any gross negligence or intentional mismanagement of personal
							information will be considered a serious form of misconduct under
							the Company’s Disciplinary code and may lead to dismissal.
						</p>
						<br />
						Examples of actions that may be taken subsequent to an investigation
						include:
						<ol className='roman'>
							<li>A recommendation to commence with disciplinary action</li>
							<li>
								A referral to law enforcement agencies for criminal
								investigation
							</li>
							<li>Risk of physical harm;</li>
							<li>
								Risk of hurt, humiliation or damage to reputation if the
								information includes medical or disciplinary records; and
							</li>
							<li>Recovery of funds in order to limit any damages caused.</li>
						</ol>
						<br />
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
					</p>
				</div>
			</div>
		</>
	)
}

export default privacy
