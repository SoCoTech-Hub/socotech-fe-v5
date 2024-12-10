import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { makeStyles } from '@mui/styles'
import Clamp from 'react-multiline-clamp'

const useStyles = makeStyles(() => ({
	criterionWrapper: {
		'& img': {
			maxHeight: '100%',
			height: 100
		}
	}
}))

export default function DroppableContent({
	criterionHtml,
	criterionId,
	handleDroppableClear
}) {
	const classes = useStyles()

	const [currentItem, setCurrentItem] = useState(null)

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: 'answer',
		drop: () => {
			// TODO: Don't let the user drop if currentItem !== null
			return { criterionId, currentItemSetter: setCurrentItem }
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}))

	const isActive = canDrop && isOver
	const backgroundColor = isActive ? 'bg-green-100' : 'bg-compBg'

	const renderCurrentItem = () => {
		if (currentItem) {
			return (
				<div className='flex justify-center w-full h-full'>
					<div className='flex flex-row w-full text-center rounded-lg shadow-outline cursor-move bg-compBg '>
						<div className='flex items-center justify-center w-full text-textColor p-2 laptop:mb-8 mobile:mb-8 mobile:mt-4 '>
							<Clamp lines={4}>
								<div
									className={classes.criterionWrapper}
									dangerouslySetInnerHTML={{ __html: currentItem }}
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: 100
									}}
								/>
							</Clamp>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className='flex justify-center w-full text-textColor'>
				{isActive ? 'Release to drop' : 'Drop your answer here'}
			</div>
		)
	}

	const clearDroppableZone = () => {
		setCurrentItem(null)
		handleDroppableClear(criterionId)
	}

	return (
		<div className='flex flex-wrap items-center w-full my-2'>
			<div className='flex items-center justify-center w-full text-textColor'>
				<div
					className={classes.criterionWrapper}
					dangerouslySetInnerHTML={{ __html: criterionHtml }}
				/>
			</div>
			<div className='flex items-center justify-center w-full py-1 '>
				<div
					ref={drop}
					className={`${
						!currentItem ? 'px-4 py-5' : ''
					} ${backgroundColor} flex justify-center items-center w-full border border-gray-400 border-dashed shadow-inner rounded-lg`}
				>
					{renderCurrentItem()}
				</div>
			</div>
			{currentItem && (
				<div className='w-full mr-3 -mt-9 text-end '>
					<span
						onClick={clearDroppableZone}
						className='cursor-pointer text-textColor '
					>
						Clear
					</span>
				</div>
			)}
		</div>
	)
}
