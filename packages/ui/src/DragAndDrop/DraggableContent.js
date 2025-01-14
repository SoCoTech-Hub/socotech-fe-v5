import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { makeStyles } from "@mui/styles";
import { useDrag } from "react-dnd";
import { Preview } from "react-dnd-preview";

const useStyles = makeStyles(() => ({
  criterionWrapper: {
    "& img": {
      maxHeight: "100%",
      height: 70,
    },
  },
}));

export function DraggableContent({
  answerHtml,
  answerId,
  handleDropAnswer,
  isTouchDevice = false,
}) {
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "answer",
    item: { answerId, answerHtml },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleDropAnswer(dropResult.criterionId, item.answerId, () =>
          dropResult.currentItemSetter(answerHtml),
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  const draggableItemHtml = ({ dragObj, aHtml, aId, wrapperStyle, style }) => {
    return (
      <div className="m-2 w-full" style={wrapperStyle}>
        <div
          ref={dragObj}
          style={style}
          data-testid={`box-${aId}`}
          className="text-textColor bg-compBg shadow-outline mobile:flex-wrap flex cursor-move flex-row rounded-lg px-4 py-5 text-center"
        >
          <div className="desktop:justify-start laptop:justify-start mobile:justify-center w-full">
            <ControlCameraIcon />
          </div>
          <div className="flex w-full justify-center">
            <div
              className={classes.criterionWrapper}
              dangerouslySetInnerHTML={{ __html: aHtml }}
            />
          </div>
        </div>
      </div>
    );
  };

  const generatePreview = ({ item, style }) => {
    if (!isTouchDevice) {
      return null;
    }

    return draggableItemHtml({
      dragObj: null,
      aHtml: item.answerHtml,
      aId: `${item.answerId}-preview`,
      wrapperStyle: style,
      style: {
        opacity: 0.4,
      },
    });
  };

  return (
    <>
      {isTouchDevice && <Preview generator={generatePreview} />}
      {draggableItemHtml({
        dragObj: drag,
        aHtml: answerHtml,
        aId: answerId,
        wrapperStyle: {},
        style: { opacity },
      })}
    </>
  );
}
