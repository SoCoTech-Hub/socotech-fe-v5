import { components } from '@reactour/tour'

export const Badge = ({ children }) => {
	return (
		<components.Badge
			styles={{
				badge: (base) => ({
					...base,
					backgroundColor: '#D6F379',
					color: 'black'
				})
			}}
		>
			{children}
		</components.Badge>
	)
}
