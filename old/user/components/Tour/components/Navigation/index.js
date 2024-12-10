import { components } from '@reactour/tour'

export const Navigation = (children) => {
	return (
		<components.Navigation
			styles={{
				navigation: (base) => ({
					...base,
					backgroundColor: '#D6F379'
				})
			}}
		>
			{children}
		</components.Navigation>
	)
}
