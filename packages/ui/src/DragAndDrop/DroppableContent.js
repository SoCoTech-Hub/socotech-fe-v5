import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDrop } from "react-dnd";
import Clamp from "react-multiline-clamp";

const useStyles = makeStyles(() => ({
  criterionWrapper: {
    "& img": {
      maxHeight: "100%",
      height: 100,
    },
  },
}));

export function DroppableContent({
  criterionHtml,
  criterionId,
  handleDroppableClear,
}) {
  const classes = useStyles();

  const [currentItem, setCurrentItem] = useState(null);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "answer",
    drop: () => {
      // TODO: Don't let the user drop if currentItem !== null
      return { criterionId, currentItemSetter: setCurrentItem };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? "bg-green-100" : "bg-compBg";

  const renderCurrentItem = () => {
    if (currentItem) {
      return (
        <div className="flex h-full w-full justify-center">
          <div className="shadow-outline bg-compBg flex w-full cursor-move flex-row rounded-lg text-center">
            <div className="text-textColor laptop:mb-8 mobile:mb-8 mobile:mt-4 flex w-full items-center justify-center p-2">
              <Clamp lines={4}>
                <div
                  className={classes.criterionWrapper}
                  dangerouslySetInnerHTML={{ __html: currentItem }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                />
              </Clamp>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-textColor flex w-full justify-center">
        {isActive ? "Release to drop" : "Drop your answer here"}
      </div>
    );
  };

  const clearDroppableZone = () => {
    setCurrentItem(null);
    handleDroppableClear(criterionId);
  };

  return (
    <div className="my-2 flex w-full flex-wrap items-center">
      <div className="text-textColor flex w-full items-center justify-center">
        <div
          className={classes.criterionWrapper}
          dangerouslySetInnerHTML={{ __html: criterionHtml }}
        />
      </div>
      <div className="flex w-full items-center justify-center py-1">
        <div
          ref={drop}
          className={`${
            !currentItem ? "px-4 py-5" : ""
          } ${backgroundColor} flex w-full items-center justify-center rounded-lg border border-dashed border-gray-400 shadow-inner`}
        >
          {renderCurrentItem()}
        </div>
      </div>
      {currentItem && (
        <div className="-mt-9 mr-3 w-full text-end">
          <span
            onClick={clearDroppableZone}
            className="text-textColor cursor-pointer"
          >
            Clear
          </span>
        </div>
      )}
    </div>
  );
}
