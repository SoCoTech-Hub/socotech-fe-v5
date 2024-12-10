import { useDrag } from 'react-dnd'
import { Preview } from 'react-dnd-preview'
import { makeStyles } from '@mui/styles'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'

const useStyles = makeStyles(() => ({
	criterionWrapper: {
		'& img': {
			maxHeight: '100%',
			height: 70
		}
	}
}))

export default function DraggableContent({
	answerHtml,
	answerId,
	handleDropAnswer,
	isTouchDevice = false
}) {
	const classes = useStyles()

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'answer',
		item: { answerId, answerHtml },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				handleDropAnswer(dropResult.criterionId, item.answerId, () =>
					dropResult.currentItemSetter(answerHtml)
				)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId()
		})
	}))

	const opacity = isDragging ? 0.4 : 1

	const draggableItemHtml = ({ dragObj, aHtml, aId, wrapperStyle, style }) => {
		return (
			<div
				className='w-full m-2 '
				style={wrapperStyle}
			>
				<div
					ref={dragObj}
					style={style}
					data-testid={`box-${aId}`}
					className='flex flex-row px-4 py-5 text-center text-textColor bg-compBg shadow-outline cursor-move mobile:flex-wrap rounded-lg'
				>
					<div className='w-full desktop:justify-start laptop:justify-start mobile:justify-center'>
						<ControlCameraIcon />
					</div>
					<div className='flex justify-center w-full'>
						<div
							className={classes.criterionWrapper}
							dangerouslySetInnerHTML={{ __html: aHtml }}
						/>
					</div>
				</div>
			</div>
		)
	}

	const generatePreview = ({ item, style }) => {
		if (!isTouchDevice) {
			return null
		}

		return draggableItemHtml({
			dragObj: null,
			aHtml: item.answerHtml,
			aId: `${item.answerId}-preview`,
			wrapperStyle: style,
			style: {
				opacity: 0.4
			}
		})
	}

	return (
		<>
			{isTouchDevice && <Preview generator={generatePreview} />}
			{draggableItemHtml({
				dragObj: drag,
				aHtml: answerHtml,
				aId: answerId,
				wrapperStyle: {},
				style: { opacity }
			})}
		</>
	)
}
