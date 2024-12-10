const people = [
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		email: 'lindsay.walton@example.com',
		role: 'Member'
	}
	// More people...
]

export const Simple = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Title
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Role
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200'>
								{people.map((person) => (
									<tr key={person.email}>
										<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-0'>
											{person.name}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.title}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.email}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.role}
										</td>
										<td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0'>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {person.name}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const DarkSimple = () => {
	return (
		<div className='bg-compBg'>
			<div className='mx-auto max-w-7xl'>
				<div className='py-10 bg-compBg'>
					<div className='px-4 sm:px-6 lg:px-8'>
						<div className='sm:flex sm:items-center'>
							<div className='sm:flex-auto'>
								<h1 className='text-base font-semibold leading-6 text-textColor'>
									Users
								</h1>
								<p className='mt-2 text-sm text-textColor'>
									A list of all the users in your account including their name,
									title, email and role.
								</p>
							</div>
							<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
								<button
									type='button'
									className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-500 rounded-full text-textColor hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
								>
									Add user
								</button>
							</div>
						</div>
						<div className='flow-root mt-8'>
							<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
								<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
									<table className='min-w-full divide-y divide-gray-700'>
										<thead>
											<tr>
												<th
													scope='col'
													className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
												>
													Name
												</th>
												<th
													scope='col'
													className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
												>
													Title
												</th>
												<th
													scope='col'
													className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
												>
													Email
												</th>
												<th
													scope='col'
													className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
												>
													Role
												</th>
												<th
													scope='col'
													className='relative py-3.5 pl-3 pr-4 sm:pr-0'
												>
													<span className='sr-only'>Edit</span>
												</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-800'>
											{people.map((person) => (
												<tr key={person.email}>
													<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-0'>
														{person.name}
													</td>
													<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
														{person.title}
													</td>
													<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
														{person.email}
													</td>
													<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
														{person.role}
													</td>
													<td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0'>
														<a
															href='#'
															className='text-textColor hover:text-textColor'
														>
															Edit
															<span className='sr-only'>, {person.name}</span>
														</a>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const FullWidth = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-300'>
								<thead className='bg-compBg'>
									<tr>
										<th
											scope='col'
											className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-6'
										>
											Name
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
										>
											Title
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
										>
											Email
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
										>
											Role
										</th>
										<th
											scope='col'
											className='relative py-3.5 pl-3 pr-4 sm:pr-6'
										>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className='bg-compBg divide-y divide-gray-200'>
									{people.map((person) => (
										<tr key={person.email}>
											<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-6'>
												{person.name}
											</td>
											<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
												{person.title}
											</td>
											<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
												{person.email}
											</td>
											<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
												{person.role}
											</td>
											<td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6'>
												<a
													href='#'
													className='text-textColor hover:text-textColor'
												>
													Edit<span className='sr-only'>, {person.name}</span>
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const FullWidthConstraint = () => {
	return (
		<div>
			<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='sm:flex sm:items-center'>
					<div className='sm:flex-auto'>
						<h1 className='text-base font-semibold leading-6 text-textColor'>
							Users
						</h1>
						<p className='mt-2 text-sm text-textColor'>
							A list of all the users in your account including their name,
							title, email and role.
						</p>
					</div>
					<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
						<button
							type='button'
							className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Add user
						</button>
					</div>
				</div>
			</div>
			<div className='flow-root mt-8 overflow-hidden'>
				<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
					<table className='w-full text-left'>
						<thead className='bg-compBg'>
							<tr>
								<th
									scope='col'
									className='relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-textColor'
								>
									Name
									<div className='absolute inset-y-0 w-screen border-b right-full -z-10 border-b-gray-200' />
									<div className='absolute inset-y-0 left-0 w-screen border-b -z-10 border-b-gray-200' />
								</th>
								<th
									scope='col'
									className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor sm:table-cell'
								>
									Title
								</th>
								<th
									scope='col'
									className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor md:table-cell'
								>
									Email
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
								>
									Role
								</th>
								<th
									scope='col'
									className='relative py-3.5 pl-3'
								>
									<span className='sr-only'>Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{people.map((person) => (
								<tr key={person.email}>
									<td className='relative py-4 pr-3 text-sm font-medium text-textColor'>
										{person.name}
										<div className='absolute bottom-0 w-screen h-px bg-compBg right-full' />
										<div className='absolute bottom-0 left-0 w-screen h-px bg-compBg' />
									</td>
									<td className='hidden px-3 py-4 text-sm text-textColor sm:table-cell'>
										{person.title}
									</td>
									<td className='hidden px-3 py-4 text-sm text-textColor md:table-cell'>
										{person.email}
									</td>
									<td className='px-3 py-4 text-sm text-textColor'>
										{person.role}
									</td>
									<td className='relative py-4 pl-3 text-sm font-medium text-right'>
										<a
											href='#'
											className='text-textColor hover:text-textColor'
										>
											Edit<span className='sr-only'>, {person.name}</span>
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export const StripedRows = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-3'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Title
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Role
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-3'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg'>
								{people.map((person, personIdx) => (
									<tr
										key={person.email}
										className={personIdx % 2 === 0 ? undefined : 'bg-compBg'}
									>
										<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-3'>
											{person.name}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.title}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.email}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.role}
										</td>
										<td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3'>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {person.name}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const UppercaseHeadings = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3 pl-4 pr-3 text-xs font-medium text-left uppercase text-textColor sm:pl-0'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-3 py-3 text-xs font-medium text-left uppercase text-textColor'
									>
										Title
									</th>
									<th
										scope='col'
										className='px-3 py-3 text-xs font-medium text-left uppercase text-textColor'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-3 py-3 text-xs font-medium text-left uppercase text-textColor'
									>
										Role
									</th>
									<th
										scope='col'
										className='relative py-3 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg divide-y divide-gray-200'>
								{people.map((person) => (
									<tr key={person.email}>
										<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-0'>
											{person.name}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.title}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.email}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.role}
										</td>
										<td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0'>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {person.name}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const StackedMobileColumns = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='mt-8 -mx-4 sm:-mx-0'>
				<table className='min-w-full divide-y divide-gray-300'>
					<thead>
						<tr>
							<th
								scope='col'
								className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
							>
								Name
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor lg:table-cell'
							>
								Title
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor sm:table-cell'
							>
								Email
							</th>
							<th
								scope='col'
								className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
							>
								Role
							</th>
							<th
								scope='col'
								className='relative py-3.5 pl-3 pr-4 sm:pr-0'
							>
								<span className='sr-only'>Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className='bg-compBg divide-y divide-gray-200'>
						{people.map((person) => (
							<tr key={person.email}>
								<td className='w-full py-4 pl-4 pr-3 text-sm font-medium text-textColor max-w-0 sm:w-auto sm:max-w-none sm:pl-0'>
									{person.name}
									<dl className='font-normal lg:hidden'>
										<dt className='sr-only'>Title</dt>
										<dd className='mt-1 truncate text-textColor'>
											{person.title}
										</dd>
										<dt className='sr-only sm:hidden'>Email</dt>
										<dd className='mt-1 truncate text-textColor sm:hidden'>
											{person.email}
										</dd>
									</dl>
								</td>
								<td className='hidden px-3 py-4 text-sm text-textColor lg:table-cell'>
									{person.title}
								</td>
								<td className='hidden px-3 py-4 text-sm text-textColor sm:table-cell'>
									{person.email}
								</td>
								<td className='px-3 py-4 text-sm text-textColor'>
									{person.role}
								</td>
								<td className='py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-0'>
									<a
										href='#'
										className='text-textColor hover:text-textColor'
									>
										Edit<span className='sr-only'>, {person.name}</span>
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const HiddenMobileColumns = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='mt-8 -mx-4 sm:-mx-0'>
				<table className='min-w-full divide-y divide-gray-300'>
					<thead>
						<tr>
							<th
								scope='col'
								className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
							>
								Name
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor sm:table-cell'
							>
								Title
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor lg:table-cell'
							>
								Email
							</th>
							<th
								scope='col'
								className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
							>
								Role
							</th>
							<th
								scope='col'
								className='relative py-3.5 pl-3 pr-4 sm:pr-0'
							>
								<span className='sr-only'>Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className='bg-compBg divide-y divide-gray-200'>
						{people.map((person) => (
							<tr key={person.email}>
								<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-0'>
									{person.name}
								</td>
								<td className='hidden px-3 py-4 text-sm text-textColor whitespace-nowrap sm:table-cell'>
									{person.title}
								</td>
								<td className='hidden px-3 py-4 text-sm text-textColor whitespace-nowrap lg:table-cell'>
									{person.email}
								</td>
								<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
									{person.role}
								</td>
								<td className='py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0'>
									<a
										href='#'
										className='text-textColor hover:text-textColor'
									>
										Edit<span className='sr-only'>, {person.name}</span>
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const AvatarsAndMultiLineContent = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Title
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Status
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Role
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg divide-y divide-gray-200'>
								{people.map((person) => (
									<tr key={person.email}>
										<td className='py-5 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0'>
											<div className='flex items-center'>
												<div className='flex-shrink-0 h-11 w-11'>
													<img
														className='rounded-full h-11 w-11'
														src={person.image}
														alt=''
													/>
												</div>
												<div className='ml-4'>
													<div className='font-medium text-textColor'>
														{person.name}
													</div>
													<div className='mt-1 text-textColor'>
														{person.email}
													</div>
												</div>
											</div>
										</td>
										<td className='px-3 py-5 text-sm text-textColor whitespace-nowrap'>
											<div className='text-textColor'>{person.title}</div>
											<div className='mt-1 text-textColor'>
												{person.department}
											</div>
										</td>
										<td className='px-3 py-5 text-sm text-textColor whitespace-nowrap'>
											<span className='inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-lg bg-green-50 ring-1 ring-inset ring-green-600/20'>
												Active
											</span>
										</td>
										<td className='px-3 py-5 text-sm text-textColor whitespace-nowrap'>
											{person.role}
										</td>
										<td className='relative py-5 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0'>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {person.name}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const StickyHeader = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle'>
						<table className='min-w-full border-separate border-spacing-0'>
							<thead>
								<tr>
									<th
										scope='col'
										className='sticky top-0 z-10 border-b border-gray-300 bg-compBg bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
									>
										Name
									</th>
									<th
										scope='col'
										className='sticky top-0 z-10 hidden border-b border-gray-300 bg-compBg bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-textColor backdrop-blur backdrop-filter sm:table-cell'
									>
										Title
									</th>
									<th
										scope='col'
										className='sticky top-0 z-10 hidden border-b border-gray-300 bg-compBg bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-textColor backdrop-blur backdrop-filter lg:table-cell'
									>
										Email
									</th>
									<th
										scope='col'
										className='sticky top-0 z-10 border-b border-gray-300 bg-compBg bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-textColor backdrop-blur backdrop-filter'
									>
										Role
									</th>
									<th
										scope='col'
										className='sticky top-0 z-10 border-b border-gray-300 bg-compBg bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{people.map((person, personIdx) => (
									<tr key={person.email}>
										<td
											className={classNames(
												personIdx !== people.length - 1
													? 'border-b border-gray-200'
													: '',
												'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-textColor sm:pl-6 lg:pl-8'
											)}
										>
											{person.name}
										</td>
										<td
											className={classNames(
												personIdx !== people.length - 1
													? 'border-b border-gray-200'
													: '',
												'hidden whitespace-nowrap px-3 py-4 text-sm text-textColor sm:table-cell'
											)}
										>
											{person.title}
										</td>
										<td
											className={classNames(
												personIdx !== people.length - 1
													? 'border-b border-gray-200'
													: '',
												'hidden whitespace-nowrap px-3 py-4 text-sm text-textColor lg:table-cell'
											)}
										>
											{person.email}
										</td>
										<td
											className={classNames(
												personIdx !== people.length - 1
													? 'border-b border-gray-200'
													: '',
												'whitespace-nowrap px-3 py-4 text-sm text-textColor'
											)}
										>
											{person.role}
										</td>
										<td
											className={classNames(
												personIdx !== people.length - 1
													? 'border-b border-gray-200'
													: '',
												'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8'
											)}
										>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {person.name}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const VerticalLines = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-md shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr className='divide-x divide-gray-200'>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-textColor sm:pl-0'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-4 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Title
									</th>
									<th
										scope='col'
										className='px-4 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Email
									</th>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-textColor sm:pr-0'
									>
										Role
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg divide-y divide-gray-200'>
								{people.map((person) => (
									<tr
										key={person.email}
										className='divide-x divide-gray-200'
									>
										<td className='py-4 pl-4 pr-4 text-sm font-medium text-textColor whitespace-nowrap sm:pl-0'>
											{person.name}
										</td>
										<td className='p-4 text-sm text-textColor whitespace-nowrap'>
											{person.title}
										</td>
										<td className='p-4 text-sm text-textColor whitespace-nowrap'>
											{person.email}
										</td>
										<td className='py-4 pl-4 pr-4 text-sm text-textColor whitespace-nowrap sm:pr-0'>
											{person.role}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const CondensedContent = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Transactions
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A table of placeholder stock market data that does not make any
						sense.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Export
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
									>
										Transaction ID
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Company
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Share
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Commision
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Price
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Quantity
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Net amount
									</th>
									<th
										scope='col'
										className='relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg divide-y divide-gray-200'>
								{transactions.map((transaction) => (
									<tr key={transaction.id}>
										<td className='py-2 pl-4 pr-3 text-sm text-textColor whitespace-nowrap sm:pl-0'>
											{transaction.id}
										</td>
										<td className='px-2 py-2 text-sm font-medium text-textColor whitespace-nowrap'>
											{transaction.company}
										</td>
										<td className='px-2 py-2 text-sm text-textColor whitespace-nowrap'>
											{transaction.share}
										</td>
										<td className='px-2 py-2 text-sm text-textColor whitespace-nowrap'>
											{transaction.commission}
										</td>
										<td className='px-2 py-2 text-sm text-textColor whitespace-nowrap'>
											{transaction.price}
										</td>
										<td className='px-2 py-2 text-sm text-textColor whitespace-nowrap'>
											{transaction.quantity}
										</td>
										<td className='px-2 py-2 text-sm text-textColor whitespace-nowrap'>
											{transaction.netAmount}
										</td>
										<td className='relative py-2 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0'>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {transaction.id}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const SortableHeadings = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
									>
										<a
											href='#'
											className='inline-flex group'
										>
											Name
											<span className='flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible'>
												<ChevronDownIcon
													className='w-5 h-5'
													aria-hidden='true'
												/>
											</span>
										</a>
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										<a
											href='#'
											className='inline-flex group'
										>
											Title
											<span className='flex-none ml-2 bg-compBgBg-100 rounded text-textColor group-hover:bg-compBg'>
												<ChevronDownIcon
													className='w-5 h-5'
													aria-hidden='true'
												/>
											</span>
										</a>
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										<a
											href='#'
											className='inline-flex group'
										>
											Email
											<span className='flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible'>
												<ChevronDownIcon
													className='flex-none invisible w-5 h-5 ml-2 text-gray-400 rounded group-hover:visible group-focus:visible'
													aria-hidden='true'
												/>
											</span>
										</a>
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										<a
											href='#'
											className='inline-flex group'
										>
											Role
											<span className='flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible'>
												<ChevronDownIcon
													className='flex-none invisible w-5 h-5 ml-2 text-gray-400 rounded group-hover:visible group-focus:visible'
													aria-hidden='true'
												/>
											</span>
										</a>
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg divide-y divide-gray-200'>
								{people.map((person) => (
									<tr key={person.email}>
										<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-0'>
											{person.name}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.title}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.email}
										</td>
										<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
											{person.role}
										</td>
										<td className='relative py-4 pl-3 pr-4 text-sm text-right whitespace-nowrap sm:pr-0'>
											<a
												href='#'
												className='text-textColor hover:text-textColor'
											>
												Edit<span className='sr-only'>, {person.name}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const GroupedRows = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full'>
							<thead className='bg-compBg'>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-3'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Title
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
									>
										Role
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-3'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-compBg'>
								{locations.map((location) => (
									<div key={location.name}>
										<tr className='border-t border-gray-200'>
											<th
												colSpan={5}
												scope='colgroup'
												className='py-2 pl-4 pr-3 text-sm font-semibold text-left text-textColor bg-compBgBg-50 sm:pl-3'
											>
												{location.name}
											</th>
										</tr>
										{location.people.map((person, personIdx) => (
											<tr
												key={person.email}
												className={classNames(
													personIdx === 0
														? 'border-gray-300'
														: 'border-gray-200',
													'border-t'
												)}
											>
												<td className='py-4 pl-4 pr-3 text-sm font-medium text-textColor whitespace-nowrap sm:pl-3'>
													{person.name}
												</td>
												<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
													{person.title}
												</td>
												<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
													{person.email}
												</td>
												<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
													{person.role}
												</td>
												<td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3'>
													<a
														href='#'
														className='text-textColor hover:text-textColor'
													>
														Edit<span className='sr-only'>, {person.name}</span>
													</a>
												</td>
											</tr>
										))}
									</div>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const SummaryRows = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Invoice
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						For work completed from{' '}
						<time dateTime='2022-08-01'>August 1, 2022</time> to{' '}
						<time dateTime='2022-08-31'>August 31, 2022</time>.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Print
					</button>
				</div>
			</div>
			<div className='flow-root mt-8 -mx-4 sm:mx-0'>
				<table className='min-w-full'>
					<colgroup>
						<col className='w-full sm:w-1/2' />
						<col className='sm:w-1/6' />
						<col className='sm:w-1/6' />
						<col className='sm:w-1/6' />
					</colgroup>
					<thead className='border-b border-gray-300 text-textColor'>
						<tr>
							<th
								scope='col'
								className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-0'
							>
								Project
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-right text-sm font-semibold text-textColor sm:table-cell'
							>
								Hours
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-right text-sm font-semibold text-textColor sm:table-cell'
							>
								Rate
							</th>
							<th
								scope='col'
								className='py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-textColor sm:pr-0'
							>
								Price
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<tr
								key={project.id}
								className='border-b border-gray-200'
							>
								<td className='py-5 pl-4 pr-3 text-sm max-w-0 sm:pl-0'>
									<div className='font-medium text-textColor'>
										{project.name}
									</div>
									<div className='mt-1 truncate text-textColor'>
										{project.description}
									</div>
								</td>
								<td className='hidden px-3 py-5 text-sm text-right text-textColor sm:table-cell'>
									{project.hours}
								</td>
								<td className='hidden px-3 py-5 text-sm text-right text-textColor sm:table-cell'>
									{project.rate}
								</td>
								<td className='py-5 pl-3 pr-4 text-sm text-right text-textColor sm:pr-0'>
									{project.price}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<th
								scope='row'
								colSpan={3}
								className='hidden pt-6 pl-4 pr-3 text-sm font-normal text-right text-textColor sm:table-cell sm:pl-0'
							>
								Subtotal
							</th>
							<th
								scope='row'
								className='pt-6 pl-6 pr-3 text-sm font-normal text-left text-textColor sm:hidden'
							>
								Subtotal
							</th>
							<td className='pt-6 pl-3 pr-6 text-sm text-right text-textColor sm:pr-0'>
								$8,800.00
							</td>
						</tr>
						<tr>
							<th
								scope='row'
								colSpan={3}
								className='hidden pt-4 pl-4 pr-3 text-sm font-normal text-right text-textColor sm:table-cell sm:pl-0'
							>
								Tax
							</th>
							<th
								scope='row'
								className='pt-4 pl-6 pr-3 text-sm font-normal text-left text-textColor sm:hidden'
							>
								Tax
							</th>
							<td className='pt-4 pl-3 pr-6 text-sm text-right text-textColor sm:pr-0'>
								$1,760.00
							</td>
						</tr>
						<tr>
							<th
								scope='row'
								colSpan={3}
								className='hidden pt-4 pl-4 pr-3 text-sm font-semibold text-right text-textColor sm:table-cell sm:pl-0'
							>
								Total
							</th>
							<th
								scope='row'
								className='pt-4 pl-6 pr-3 text-sm font-semibold text-left text-textColor sm:hidden'
							>
								Total
							</th>
							<td className='pt-4 pl-3 pr-4 text-sm font-semibold text-right text-textColor sm:pr-0'>
								$10,560.00
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}

export const WithBorder = () => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Plans
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						Your team is on the{' '}
						<strong className='font-semibold text-textColor'>Startup</strong>{' '}
						plan. The next payment of $80 will be due on August 4, 2022.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block px-3 py-2 text-sm font-semibold text-center bg-indigo-600 rounded-full shadow-sm text-textColor hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Update credit card
					</button>
				</div>
			</div>
			<div className='mt-10 -mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg'>
				<table className='min-w-full divide-y divide-gray-300'>
					<thead>
						<tr>
							<th
								scope='col'
								className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textColor sm:pl-6'
							>
								Plan
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor lg:table-cell'
							>
								Memory
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor lg:table-cell'
							>
								CPU
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-textColor lg:table-cell'
							>
								Storage
							</th>
							<th
								scope='col'
								className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
							>
								Price
							</th>
							<th
								scope='col'
								className='relative py-3.5 pl-3 pr-4 sm:pr-6'
							>
								<span className='sr-only'>Select</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{plans.map((plan, planIdx) => (
							<tr key={plan.id}>
								<td
									className={classNames(
										planIdx === 0 ? '' : 'border-t border-transparent',
										'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
									)}
								>
									<div className='font-medium text-textColor'>
										{plan.name}
										{plan.isCurrent ? (
											<span className='ml-1 text-textColor'>
												(Current Plan)
											</span>
										) : null}
									</div>
									<div className='flex flex-col mt-1 text-textColor sm:block lg:hidden'>
										<span>
											{plan.memory} / {plan.cpu}
										</span>
										<span className='hidden sm:inline'>·</span>
										<span>{plan.storage}</span>
									</div>
									{planIdx !== 0 ? (
										<div className='absolute right-0 h-px bg-compBg -top-px left-6' />
									) : null}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? '' : 'border-t border-gray-200',
										'hidden px-3 py-3.5 text-sm text-textColor lg:table-cell'
									)}
								>
									{plan.memory}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? '' : 'border-t border-gray-200',
										'hidden px-3 py-3.5 text-sm text-textColor lg:table-cell'
									)}
								>
									{plan.cpu}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? '' : 'border-t border-gray-200',
										'hidden px-3 py-3.5 text-sm text-textColor lg:table-cell'
									)}
								>
									{plan.storage}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? '' : 'border-t border-gray-200',
										'px-3 py-3.5 text-sm text-textColor'
									)}
								>
									<div className='sm:hidden'>{plan.price}/mo</div>
									<div className='hidden sm:block'>{plan.price}/month</div>
								</td>
								<td
									className={classNames(
										planIdx === 0 ? '' : 'border-t border-transparent',
										'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
									)}
								>
									<button
										type='button'
										className='inline-flex items-center rounded-full bg-compBg px-2.5 py-1.5 text-sm font-semibold text-textColor shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-compBg'
										disabled={plan.isCurrent}
									>
										Select<span className='sr-only'>, {plan.name}</span>
									</button>
									{planIdx !== 0 ? (
										<div className='absolute left-0 h-px bg-gray-200 -top-px right-6' />
									) : null}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const WithCheckBoxes = () => {
	const checkbox = useRef()
	const [checked, setChecked] = useState(false)
	const [indeterminate, setIndeterminate] = useState(false)
	const [selectedPeople, setSelectedPeople] = useState([])

	useLayoutEffect(() => {
		const isIndeterminate =
			selectedPeople.length > 0 && selectedPeople.length < people.length
		setChecked(selectedPeople.length === people.length)
		setIndeterminate(isIndeterminate)
		checkbox.current.indeterminate = isIndeterminate
	}, [selectedPeople])

	function toggleAll() {
		setSelectedPeople(checked || indeterminate ? [] : people)
		setChecked(!checked && !indeterminate)
		setIndeterminate(false)
	}

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-textColor'>
						Users
					</h1>
					<p className='mt-2 text-sm text-textColor'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className='block rounded-full bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-textColor shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='flow-root mt-8'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<div className='relative'>
							{selectedPeople.length > 0 && (
								<div className='absolute top-0 flex items-center h-12 space-x-3 bg-compBg left-14 sm:left-12'>
									<button
										type='button'
										className='inline-flex items-center px-2 py-1 text-sm font-semibold bg-compBg rounded shadow-sm text-textColor ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-compBg'
									>
										Bulk edit
									</button>
									<button
										type='button'
										className='inline-flex items-center px-2 py-1 text-sm font-semibold bg-compBg rounded shadow-sm text-textColor ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-compBg'
									>
										Delete all
									</button>
								</div>
							)}
							<table className='min-w-full divide-y divide-gray-300 table-fixed'>
								<thead>
									<tr>
										<th
											scope='col'
											className='relative px-7 sm:w-12 sm:px-6'
										>
											<input
												type='checkbox'
												className='absolute w-4 h-4 -mt-2 border-gray-300 rounded text-textColor left-4 top-1/2 focus:ring-indigo-600'
												ref={checkbox}
												checked={checked}
												onChange={toggleAll}
											/>
										</th>
										<th
											scope='col'
											className='min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-textColor'
										>
											Name
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
										>
											Title
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
										>
											Email
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-textColor'
										>
											Role
										</th>
										<th
											scope='col'
											className='relative py-3.5 pl-3 pr-4 sm:pr-3'
										>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className='bg-compBg divide-y divide-gray-200'>
									{people.map((person) => (
										<tr
											key={person.email}
											className={
												selectedPeople.includes(person)
													? 'bg-compBg'
													: undefined
											}
										>
											<td className='relative px-7 sm:w-12 sm:px-6'>
												{selectedPeople.includes(person) && (
													<div className='absolute inset-y-0 left-0 w-0.5 bg-indigo-600' />
												)}
												<input
													type='checkbox'
													className='absolute w-4 h-4 -mt-2 border-gray-300 rounded text-textColor left-4 top-1/2 focus:ring-indigo-600'
													value={person.email}
													checked={selectedPeople.includes(person)}
													onChange={(e) =>
														setSelectedPeople(
															e.target.checked
																? [...selectedPeople, person]
																: selectedPeople.filter((p) => p !== person)
														)
													}
												/>
											</td>
											<td
												className={classNames(
													'whitespace-nowrap py-4 pr-3 text-sm font-medium',
													selectedPeople.includes(person)
														? 'text-textColor'
														: 'text-textColor'
												)}
											>
												{person.name}
											</td>
											<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
												{person.title}
											</td>
											<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
												{person.email}
											</td>
											<td className='px-3 py-4 text-sm text-textColor whitespace-nowrap'>
												{person.role}
											</td>
											<td className='py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3'>
												<a
													href='#'
													className='text-textColor hover:text-textColor'
												>
													Edit<span className='sr-only'>, {person.name}</span>
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const WithHiddenHeadings = () => {
	return (
		<div>
			<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<h2 className='max-w-2xl mx-auto text-base font-semibold leading-6 text-textColor lg:mx-0 lg:max-w-none'>
					Recent activity
				</h2>
			</div>
			<div className='mt-6 overflow-hidden border-t border-gray-100'>
				<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
					<div className='max-w-2xl mx-auto lg:mx-0 lg:max-w-none'>
						<table className='w-full text-left'>
							<thead className='sr-only'>
								<tr>
									<th>Amount</th>
									<th className='hidden sm:table-cell'>Client</th>
									<th>More details</th>
								</tr>
							</thead>
							<tbody>
								{days.map((day) => (
									<div key={day.dateTime}>
										<tr className='text-sm leading-6 text-textColor'>
											<th
												scope='colgroup'
												colSpan={3}
												className='relative py-2 font-semibold isolate'
											>
												<time dateTime={day.dateTime}>{day.date}</time>
												<div className='absolute inset-y-0 w-screen border-b border-gray-200 right-full -z-10 bg-compBg' />
												<div className='absolute inset-y-0 left-0 w-screen border-b border-gray-200 -z-10 bg-gray-50' />
											</th>
										</tr>
										{day.transactions.map((transaction) => (
											<tr key={transaction.id}>
												<td className='relative py-5 pr-6'>
													<div className='flex gap-x-6'>
														<transaction.icon
															className='flex-none hidden w-5 h-6 text-gray-400 sm:block'
															aria-hidden='true'
														/>
														<div className='flex-auto'>
															<div className='flex items-start gap-x-3'>
																<div className='text-sm font-medium leading-6 text-textColor'>
																	{transaction.amount}
																</div>
																<div
																	className={classNames(
																		statuses[transaction.status],
																		'rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset'
																	)}
																>
																	{transaction.status}
																</div>
															</div>
															{transaction.tax ? (
																<div className='mt-1 text-xs leading-5 text-textColor'>
																	{transaction.tax} tax
																</div>
															) : null}
														</div>
													</div>
													<div className='absolute bottom-0 w-screen h-px bg-compBg right-full' />
													<div className='absolute bottom-0 left-0 w-screen h-px bg-compBg' />
												</td>
												<td className='hidden py-5 pr-6 sm:table-cell'>
													<div className='text-sm leading-6 text-textColor'>
														{transaction.client}
													</div>
													<div className='mt-1 text-xs leading-5 text-textColor'>
														{transaction.description}
													</div>
												</td>
												<td className='py-5 text-right'>
													<div className='flex justify-end'>
														<a
															href={transaction.href}
															className='text-sm font-medium leading-6 text-textColor hover:text-indigo-500'
														>
															View
															<span className='hidden sm:inline'>
																{' '}
																transaction
															</span>
															<span className='sr-only'>
																, invoice #{transaction.invoiceNumber},{' '}
																{transaction.client}
															</span>
														</a>
													</div>
													<div className='mt-1 text-xs leading-5 text-textColor'>
														Invoice{' '}
														<span className='text-textColor'>
															#{transaction.invoiceNumber}
														</span>
													</div>
												</td>
											</tr>
										))}
									</div>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const DarkFullWidthAvatars = () => {
	return (
		<div className='py-10 bg-compBg'>
			<h2 className='px-4 text-base font-semibold leading-7 text-textColor sm:px-6 lg:px-8'>
				Latest activity
			</h2>
			<table className='w-full mt-6 text-left whitespace-nowrap'>
				<colgroup>
					<col className='w-full sm:w-4/12' />
					<col className='lg:w-4/12' />
					<col className='lg:w-2/12' />
					<col className='lg:w-1/12' />
					<col className='lg:w-1/12' />
				</colgroup>
				<thead className='text-sm leading-6 border-b text-textColor border-white/10'>
					<tr>
						<th
							scope='col'
							className='py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8'
						>
							User
						</th>
						<th
							scope='col'
							className='hidden py-2 pl-0 pr-8 font-semibold sm:table-cell'
						>
							Commit
						</th>
						<th
							scope='col'
							className='py-2 pl-0 pr-4 font-semibold text-right sm:pr-8 sm:text-left lg:pr-20'
						>
							Status
						</th>
						<th
							scope='col'
							className='hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20'
						>
							Duration
						</th>
						<th
							scope='col'
							className='hidden py-2 pl-0 pr-4 font-semibold text-right sm:table-cell sm:pr-6 lg:pr-8'
						>
							Deployed at
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-white/5'>
					{activityItems.map((item) => (
						<tr key={item.commit}>
							<td className='py-4 pl-4 pr-8 sm:pl-6 lg:pl-8'>
								<div className='flex items-center gap-x-4'>
									<img
										src={item.user.imageUrl}
										alt=''
										className='w-8 h-8 bg-compBg rounded-full'
									/>
									<div className='text-sm font-medium leading-6 truncate text-textColor'>
										{item.user.name}
									</div>
								</div>
							</td>
							<td className='hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8'>
								<div className='flex gap-x-3'>
									<div className='font-mono text-sm leading-6 text-gray-400'>
										{item.commit}
									</div>
									<div className='px-2 py-1 text-xs font-medium text-gray-400 rounded-full bg-compBg/40 ring-1 ring-inset ring-white/10'>
										{item.branch}
									</div>
								</div>
							</td>
							<td className='py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20'>
								<div className='flex items-center justify-end gap-x-2 sm:justify-start'>
									<time
										className='text-gray-400 sm:hidden'
										dateTime={item.dateTime}
									>
										{item.date}
									</time>
									<div
										className={classNames(
											statuses[item.status],
											'flex-none rounded-full p-1'
										)}
									>
										<div className='h-1.5 w-1.5 rounded-full bg-current' />
									</div>
									<div className='hidden text-textColor sm:block'>
										{item.status}
									</div>
								</div>
							</td>
							<td className='hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20'>
								{item.duration}
							</td>
							<td className='hidden py-4 pl-0 pr-4 text-sm leading-6 text-right text-gray-400 sm:table-cell sm:pr-6 lg:pr-8'>
								<time dateTime={item.dateTime}>{item.date}</time>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
