import LogoOverlay from '@/components/LogoOverlay'
import { mainUrl } from '@/context/constants'
import Head from 'next/head'
import Btn from '@/components/Btn'
import { useRouter } from 'next/router'

const paymentPolicy = () => {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Payments Policy</title>
				<meta
					name='description'
					content='Terms of Use Page'
				/>
			</Head>
			<div className='p-4 overflow-scroll bg-compBg desktop:h-full laptop:h-full mobile:h-full no-scrolly'>
				<LogoOverlay />
				<div className='p-4 bg-compBg desktop:mt-28 laptop:mt-20 mobile:mt-12 rounded-lg drop-shadow-md no-scrolly '>
					<div className='flex items-center justify-between mb-2'>
						<div className='text-xl'>Payments Policy</div>
						<div className=''>
							<Btn
								label='Back'
								color='bg-themeColorMain'
								onClickFunction={() => router.back()}
							/>
						</div>
					</div>
					<p>
						<span className='font-bold'>1. Service provider</span> <br />
						<p>
							Just Brands Africa (PTY) Ltd, Reg. 2013/228381/07, is the service
							provider of the services contemplated by this Payments Policy
							directly, and/ or through its subsidiary SOCOTECH (PTY) Ltd, Reg.
							2020/724125/07, or contracted third party affiliates on
							www.suadvantage.co.za
						</p>
					</p>
					<br />
					<p>
						<span className='font-bold'>2. Enrolment</span> <br />
						<ul className='roman'>
							<li>
								Monthly supplementary education subscription fees must be paid
								in full for the month of use to reserve a student’s seat for the
								said month.
							</li>
							<li>
								SU Advantage reserves the right to revoke admission to a monthly
								supplementary education subscription without full payment upon
								which a student’s enrolment will be cancelled.
							</li>
							<li>
								monthly supplementary education subscription fees funded by a
								third party on behalf of a student must be accompanied by
								supporting documentation (e.g. official purchase order, proof of
								payment).
							</li>
							<li>
								SU Advantage further reserves the right to withhold access to
								any monthly supplementary education subscription and/or a
								student’s results and usage reports if full payment has not been
								received.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>
							3. Learner and legal guardian responsibilities
						</span>{' '}
						<ul className='roman'>
							<li>
								Learner legal guardians must inform SU Advantage of any change
								of personal and/or payment information as supplied on their
								billing information forms.
							</li>
							<li>
								Both learners and legal guardians confirm that they comply with
								and fully understand the admission requirements of a monthly
								supplementary education subscription upon subscribing.
							</li>
							<li>
								Learners and legal guardians confirm their willingness to
								subscribe for a monthly supplementary education subscription and
								accept all responsibilities for payment of relevant monthly
								supplementary education subscription fees unless payment is
								being made on behalf of the learner by a third party as
								mentioned above.
							</li>
							<li>
								Learners confirm that they understand that it is against SU
								Advantage’s policy to commit any form of plagiarism (i.e.
								publishing or putting the work or ideas of other forward as
								their own).
							</li>
							<li>
								{' '}
								Students will abide by the general code of conduct for students
								of the SU Advantage.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>4. Payments</span>

						<ul className='roman'>
							<li>
								You will be able to make use of the following means of payment
								for any of the www.suadvantage.co.za services:
							</li>
							<li>Debit card</li>
							<li>Credit card</li>
							<li>
								SU Advantage takes extensive steps to ensure that all
								transactions are secure. All transactions made through the
								Website are encrypted. You acknowledge that transactions that
								are performed over the internet may be vulnerable to being
								intercepted. www.suadvantage.co.za will not be liable for any
								loss that you may suffer because of any interception.
							</li>
							<li>
								{' '}
								Where payment is made by credit/debit card,
								www.suadvantage.co.za may require additional information to
								authorise and/or verify the validity of payment. In such cases
								we are entitled to withhold delivery until the additional
								information is received by us and authorisation is obtained by
								us for the amounts. If we do not receive authorisation, your
								order for the services will be cancelled. You warrant that you
								are fully authorised to use the credit/debit card supplied for
								purposes of paying the services. You also warrant that your
								credit/debit card has enough available funds to cover all the
								costs incurred because of the services used on the Website.
							</li>
							<li>
								SU Advantage reserves the right at any time and without giving
								you any advance notice to make changes to the prices of services
								and to correct any pricing errors that may inadvertently occur.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>5. Cancellation</span>
						<ul className='roman'>
							<li>
								SU Advantage reserves the right to refuse admission to a monthly
								supplementary education subscription, in which case learners
								will be informed accordingly and applicable fees will be
								refunded where required.
							</li>
							<li>
								Cancellations from learners are accepted via cancelling the
								subscription under the billing information tab
							</li>
							<li>
								Learners who cancel outside the approved cancellation period
								will not be entitled to any refunds, unless they are unable to
								attend because of reasons out of their control (e.g.
								hospitalisation) or where, at sole discretion of SU Advantage,
								it is rendered impossible for delegates to attend a course.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>6. Privacy</span>
						<br />
						Please refer to our Privacy Policy incorporated by reference (which
						means that it forms part of these Terms and Conditions).
					</p>
					<br />
					<p>
						<span className='font-bold'>7. Disclaimer</span>
						<ul className='roman'>
							<li>
								The use of the Website is entirely at your own risk and you
								assume full responsibility for any risk or loss resulting from
								use of the Website or reliance on any information on the
								Website.
							</li>
							<li>
								Whilst SU Advantage takes reasonable measures to ensure that the
								content of the Website is accurate and complete, SU Advantage
								makes no representations or warranties, whether express or
								implied, as to the quality, timeliness, operation, integrity,
								availability or functionality of the Website or as to the
								accuracy, completeness or reliability of any information on the
								Website. If any such representations or warranties are made by
								SU Advantage’s representatives, SU Advantage shall not be bound
								thereby.
							</li>
							<li>
								SU Advantage disclaims liability for any damage, loss or
								expenses, whether direct, indirect or consequential in nature,
								arising out of or in connection with your access to or use of
								the Website and/or any content therein unless otherwise provided
								by law.
							</li>
							<li>
								Although the services sold from the Website or SU Advantage may,
								under certain specifically defined circumstances, be under
								warranty, the Website itself and all information provided on the
								Website is provided “as is” without warranty of any kind, either
								express or implied, including, but not limited to, the implied
								warranties of merchantability, fitness for a particular purpose,
								completeness, or non-infringement, as may be allowed in law.
							</li>
							<li>
								In addition to the disclaimers contained elsewhere in these
								Terms and Conditions, SU Advantage also makes no warranty or
								representation, whether express or implied, that the information
								or files available on the Website are free of viruses, spyware,
								malware, trojans, destructive materials or any other data or
								code which is able to corrupt, destroy, compromise, disrupt,
								disable, harm, jeopardise or otherwise impede in any manner the
								operation, stability, security functionality or content of your
								computer system, computer network, hardware or software in any
								way.
							</li>
							<li>
								You accept all risk associated with the existence of such
								viruses, destructive materials or any other data or code which
								is able to corrupt, compromise, jeopardise, disrupt, disable,
								harm or otherwise impede in any manner the operation or content
								of a computer system, computer network, any handset or mobile
								device, or your hardware or software, save where such risks
								arise due to the gross negligence or willful misconduct of SU
								Advantage, its employees, agents or authorised representatives.
								SU Advantage thus disclaims all liability for any damage, loss
								or liability of any nature whatsoever arising out of or in in
								connection with your access to or use of the Website.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>
							8. Linking to third party websites
						</span>
						<br />
						<ul className='roman'>
							<li>
								This Website may contain links or references to other websites
								(“Other Websites”) which are outside of SU Advantage control.
								These Terms and Conditions do not apply to those Other Websites
								and SU Advantage is not responsible for the practices and/or
								privacy policies of those Other Websites or the “cookies” that
								those sites may use.
							</li>
							<li>
								Notwithstanding the fact that the Website may refer to or
								provide links to Other Websites, your use of such Other Websites
								is entirely at your own risk and we are not responsible for any
								loss, expense, claim or damage, whether direct, indirect or
								consequential, arising from your use of such Other Websites or
								your reliance on any information contained thereon.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>9. Limitation of liability</span>
						<br />
						<ul className='roman'>
							<li>
								SU Advantage cannot be held liable for any inaccurate
								information published on the Website and/or any incorrect prices
								displayed on the Website, save where such liability arises from
								the gross negligence or willful misconduct of SU Advantage, its
								employees, agents or authorised representatives.
							</li>
							<li>
								To the extent permissible by law, SU Advantage will not be
								liable for any direct, indirect, special or consequential loss
								or damages howsoever arising out of your use of any of the SU
								Advantage services.
							</li>
							<li>
								SU Advantage will not be liable for any direct, indirect,
								special or consequential loss or damages howsoever arising
								including but not limited to, your use of this Website, activity
								on the Website and or any linked Other Websites.
							</li>
							<li>
								You hereby indemnify SU Advantage and hold it harmless against
								any loss or damage you or any third party may suffer because of
								your use of this Website, any Other Website and/or the SU
								Advantage services.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>
							10. Governing law and jurisdiction
						</span>
						<br />
						<ul className='roman'>
							<li>
								These Terms and Conditions and our relationship and/or any
								dispute arising from or in connection with these Terms and
								Conditions shall be governed and interpreted in accordance with
								the laws of the Republic of South Africa.
							</li>
							<li>
								Your continued use of the Website will constitute your consent
								and submission to the jurisdiction of the South African courts
								regarding all proceedings, transactions, applications or the
								like instituted by either party against the other, arising from
								any of these Terms and Conditions.
							</li>
							<li>
								In the event of any dispute arising between you and SU
								Advantage, you hereby consent to the non-exclusive jurisdiction
								of the High Court of the Republic of South Africa
								notwithstanding that the quantum in the action or proceedings
								may otherwise fall below the monetary jurisdiction of that
								court.
							</li>
							<li>
								Nothing in the Terms and Conditions limits your right to
								approach any court, tribunal or forum of competent jurisdiction
								in terms of the Consumer Protection Act.
							</li>
						</ul>
					</p>
					<br />
					<p>
						<span className='font-bold'>11. General</span>
						<br />
						<ul className='roman'>
							<li>
								You may not cede, assign or otherwise transfer your rights and
								obligations in terms of these Terms and Conditions to any third
								party.
							</li>
							<li>
								This policy will form part of the SU Advantage’s policy
								framework and any terms and conditions regulating the
								relationship between SU Advantage and the consumer, the student.
							</li>
							<li>
								Any failure on the part of you or SU Advantage to enforce any
								right in terms hereof shall not constitute a waiver of that
								right.
							</li>
							<li>
								If any term or condition contained herein is declared invalid,
								the remaining terms and conditions will remain in full force and
								effect.
							</li>
							<li>
								No variation, addition, deletion, or agreed cancellation of the
								Terms and Conditions will be of any force or effect unless in
								writing and accepted by or on behalf of the parties hereto.
							</li>
							<li>
								If you need to obtain a sales record of your transaction to buy
								services through the and SU Advantage Website, you can contact
								SU Advantage within 30 days of the transaction.
							</li>
							<li>
								No indulgence, extension of time, relaxation or latitude which
								any party (the “grantor”) may show grant or allow to the other
								(the “grantee”) shall constitute a waiver by the grantor of any
								of the grantor’s rights and the grantor shall not thereby be
								prejudiced or stopped from exercising any of its rights against
								the grantee which may have arisen in the past or which might
								arise in the future.
							</li>
							<li>
								These Terms and Conditions contain the whole agreement between
								you and SU Advantage and no other warranty or undertaking is
								valid, unless contained in this document between the parties.
							</li>
						</ul>
					</p>
				</div>
			</div>
		</>
	)
}

export default paymentPolicy
