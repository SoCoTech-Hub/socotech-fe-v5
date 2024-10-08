import { components } from '@reactour/tour'

export const Content = ({ content }) => (
	<components.Content
		styles={{
			content: (base) => ({
				...base,
				backgroundColor: '#181818',
				color: 'white',
				borderRadius: '20px'
			})
		}}
	>
		{content}
	</components.Content>
)
