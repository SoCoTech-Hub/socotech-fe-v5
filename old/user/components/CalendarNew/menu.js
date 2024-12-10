import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import classNames from '../snippets/classNames'
import ViewButton from './AddEvents/viewButton'

export default function MenuLink() {
	return (
		<Menu
			as='div'
			className='relative ml-6 md:hidden'
		>
			<Menu.Button className='flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500'>
				<span className='sr-only'>Open menu</span>
				<EllipsisHorizontalIcon
					className='w-5 h-5'
					aria-hidden='true'
				/>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className='py-1'>
						<Menu.Item>
							{({ active }) => (
								<a
									href='#'
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Create event
								</a>
							)}
						</Menu.Item>
					</div>
					<div className='py-1'>
						<Menu.Item>
							{({ active }) => (
								<a
									href='#'
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Go to today
								</a>
							)}
						</Menu.Item>
					</div>
					<div className='py-1'>
						<Menu.Item>
							<ViewButton
								url='/weekly'
								label='Weekly View'
							/>
						</Menu.Item>
						<Menu.Item>
							<ViewButton
								url='/'
								label='Monthly View'
							/>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
