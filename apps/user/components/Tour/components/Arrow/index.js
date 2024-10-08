import { components } from '@reactour/tour'

export const Arrow = (children) => {
	return (
		<components.Arrow
			styles={{
				arrow: (base) => ({
					...base,
					color: '#D6F379'
				})
			}}
		>
			{children}
		</components.Arrow>
	)
}
