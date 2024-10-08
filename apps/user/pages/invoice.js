import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import api from '@/api/api'
import getDataRequest from '@/snippets/getDataRequest'
import { parseCookies } from '@/snippets/parseCookies'
import { isPaying, mainUrl } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'
import invoice from '@/snippets/email/invoice'
import Alert from '@/components/Alert'

const Invoice = ({ transaction, event, organization }) => {
	const router = useRouter()
	const [email, setEmail] = useState(transaction?.email || '')
	const [alert, setAlert] = useState('')
	const date = new Date(event?.created_at || Date.now())
	const formatter = new Intl.NumberFormat('en-ZA', {
		style: 'currency',
		currency: 'ZAR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})

	useEffect(() => {
		if (!isPaying) {
			router.push(`${mainUrl}/user`)
		}
	}, [])

	const zeroPad = (num, places) => String(num).padStart(places, '0')

	const handleSendInvoice = async () => {
		try {
			await api.post(`/email`, {
				from: 'info@topic.co.za',
				to: email,
				subject: `${organization.name} Invoice ${organization.name
					.substring(0, 3)
					.toUpperCase()}-${transaction.mPaymentId}-${zeroPad(event.id, 3)}`,
				html: Body
			})
			setAlert('Email sent successfully.')
		} catch (error) {
			console.error(error)
			alert(error.message)
		}
	}

	const handlePrintInvoice = () => {
		window.print()
	}

	const Body = invoice({
		organizationName: organization.name,
		organizationPrimaryColor: organization.primaryColor,
		organizationSecondaryColor: organization.secondaryColor,
		organizationLogoDarkUrl: organization.logoDark.url,
		firstName: transaction.firstName,
		lastName: transaction.lastName,
		addressLine1: transaction.addressLine1,
		postalCode: transaction.postalCode,
		company: transaction.company,
		vatNr: transaction.vatNr,
		date: date,
		mPaymentId: transaction.mPaymentId,
		id: event.id,
		item: transaction.item,
		description: transaction.description,
		amount: transaction.amount,
		formatter: formatter,
		zeroPad: zeroPad
	})

	const InvoiceBodyHTML = () => (
		<div
			dangerouslySetInnerHTML={{
				__html: generateInvoiceHTML(
					transaction,
					event,
					organization,
					date,
					zeroPad,
					formatter
				)
			}}
		/>
	)

	return (
		<>
			<div className='col row'>
				<SEO
					title='Topic - User Invoice'
					description='Access and manage User Invoices!'
				/>
				<form className='px-8 pt-6 pb-8 mb-4 rounded-lg shadow-md bg-compBg'>
					<div className='mb-4'>
						<label
							className='block mb-2 text-sm font-bold text-textColor'
							htmlFor='sender'
						>
							Email invoice to:
						</label>
						<input
							className='w-full px-3 py-2 leading-tight border rounded-lg shadow appearance-none text-black focus:outline-none focus:shadow-outline'
							id='sender'
							name='sender'
							type='email'
							value={email}
							required
							placeholder='Who is this invoice sent to? (required)'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='flex items-center justify-between'>
						<button
							className='px-4 py-2 font-bold bg-themeColorMain rounded-full text-black focus:outline-none focus:shadow-outline'
							type='button'
							onClick={handleSendInvoice}
						>
							Send Invoice
						</button>
						<button
							className='px-4 py-2 font-bold bg-blue-500 rounded-full hover:bg-blue-700 text-textColor focus:outline-none focus:shadow-outline'
							type='button'
							onClick={handlePrintInvoice}
						>
							Download Invoice
						</button>
						<Alert success={alert} />
					</div>
				</form>
				<InvoiceBodyHTML />
			</div>
			<div
				className='print-only'
				id='section-to-print'
			>
				<div dangerouslySetInnerHTML={{ __html: Body }} />
			</div>
		</>
	)
}

const generateInvoiceHTML = (
	transaction,
	event,
	organization,
	date,
	zeroPad,
	formatter
) => {
	return `
    <div class="w-full">
      <div class="w-full text-textColor">
        <div class="row mb-3">
          <div class="column">
            <div class="bold text-large">${organization.name} INVOICE</div>
            <div class="my-3">
              <div>${transaction.firstName} ${transaction.lastName}</div>
              ${
								transaction.addressLine1
									? `<div>${transaction.addressLine1}</div>`
									: ''
							}
              ${
								transaction.postalCode
									? `<div>${transaction.postalCode}</div>`
									: ''
							}
              ${transaction.email ? `<div>${transaction.email}</div>` : ''}
              ${
								transaction.company
									? `<div>${transaction.company} ${
											transaction.vatNr || ''
									  }</div>`
									: ''
							}
            </div>
          </div>
          <div class="column text-right mb-3">
            <div class="bold">Invoice Date:</div>
            <div>${date.toLocaleDateString()}</div>
            <div class="bold pt-tiny">Learner Number:</div>
            <div>${transaction.mPaymentId}</div>
            <div class="bold pt-tiny">Invoice Number:</div>
            <div>${organization.name.substring(0, 3).toUpperCase()}${zeroPad(
		event.id,
		7
	)}</div>
            <div class="bold pt-tiny">Reference:</div>
            <div>${organization.name.substring(0, 3).toUpperCase()}-${
		transaction.mPaymentId
	}-${zeroPad(event.id, 3)}
	</div>
          </div>
        </div>
        <div class="mt-3">
          <table style="width: 100%; border-collapse: collapse;">
            <thead class="table-header">
              <tr>
                <td class="desktop:w-10 laptop:w-10 mobile:w-1/2" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Item</strong></td>
								<td class="desktop:hidden laptop:hidden" ></td>
                <td class="w-half text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Description</strong></td>
                <td class="w-10 text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Quantity</strong></td>
                <td class="w-10 text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Unit Price</strong></td>
                <td class="w-10 text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>VAT</strong></td>
                <td class="desktop:w-10 laptop:w-10 text-right mobile:w-1/2" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Amount</strong></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${
									transaction.item
								}</td>
								<td class="desktop:hidden laptop:hidden" ></td>
                <td class="mobile:hidden" style="border: 1px solid #000; padding: 8px;">${
									transaction.description
								}</td>
                <td class="text-center mobile:hidden" style="border: 1px solid #000; padding: 8px;">1</td>
                <td class="text-center mobile:hidden" style="border: 1px solid #000; padding: 8px;">${formatter.format(
									transaction.amount * 0.85
								)}</td>
                <td class="text-center mobile:hidden" style="border: 1px solid #000; padding: 8px;">15%</td>
                <td class="text-right" style="border: 1px solid #000; padding: 8px;">${formatter.format(
									transaction.amount
								)}</td>
              </tr>
            </tbody>
            <tfoot class="table-footer">
              <tr >
								<td class="desktop:hidden laptop:hidden" ></td>
								<td colspan="4"  class="mobile:hidden" ></td>
                <td class="text-right" style="border: 1px solid #000; padding: 8px;"><strong>VAT Total:</strong></td>
                <td class="text-right" style="border: 1px solid #000; padding: 8px;">${formatter.format(
									transaction.amount * 0.15
								)}</td>
              </tr>
							
              <tr >
							  <td class="desktop:hidden laptop:hidden" ></td>
                <td colspan="4"  class="mobile:hidden" ></td>
                <td  class="text-right" style="border: 1px solid #000; padding: 8px;"><strong>Total:</strong></td>
                <td class="text-right" style="border: 1px solid #000; padding: 8px;">${formatter.format(
									transaction.amount
								)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="flex-wrap">
          <p class="text-1 leading-tight py-2">
            Just Brands Africa (PTY) Ltd
            <br />
            VAT: 4800270201
            <br />
            info@topic.co.za
            <br />
            www.topic.co.za
          </p>
        </div>
      </div>
    </div>
  `
}

const SEO = ({ title, description }) => (
	<Head>
		<title>{title}</title>
		<meta
			name='title'
			content={title}
		/>
		<meta
			name='description'
			content={description}
		/>
		<meta
			property='og:type'
			content='website'
		/>
		<meta
			property='og:url'
			content='https://topic.co.za'
		/>
		<meta
			property='og:title'
			content={title}
		/>
		<meta
			property='og:description'
			content={description}
		/>
		<meta
			property='og:image'
			content='https://lms.topic.co.za/user/logo.png'
		/>
		<meta
			property='twitter:card'
			content='summary_large_image'
		/>
		<meta
			property='twitter:url'
			content='https://topic.co.za'
		/>
		<meta
			property='twitter:title'
			content={title}
		/>
		<meta
			property='twitter:description'
			content={description}
		/>
		<meta
			property='twitter:image'
			content='https://lms.topic.co.za/user/logo.png'
		/>
	</Head>
)

export async function getServerSideProps({ req }) {
	const cookies = parseCookies(req)
	const uniqueId = cookies.uniqueId

	const transaction = await getDataRequest(
		`/transactions?mPaymentId=${uniqueId}`,
		() => {}
	)
	let event = []

	if (transaction.length) {
		event = await getDataRequest(
			`transaction-events?eventId=${transaction[0].id}`,
			() => {}
		)
	}

	const { organization } = await getGQLRequest({
		endpoint: 'organization',
		findOne: true,
		id: cookies.organizationId,
		fields: 'logo{url},name,logoDark{url}'
	})

	return {
		props: {
			transaction: transaction.length ? transaction[0] : {},
			event: event.length ? event.pop() : {},
			organization
		}
	}
}

export default Invoice
