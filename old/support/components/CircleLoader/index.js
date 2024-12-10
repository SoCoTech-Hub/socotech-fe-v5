import React from "react";
import { CircularProgress } from "@mui/material";
import { useStylesFacebook } from "./styles";

const CircleLoader = (props) => {
  const classes = useStylesFacebook();

  return (
    <div className="ml-2">
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={20}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={20}
          thickness={4}
          {...props}
        />
      </div>
    </div>
  );
};

export default CircleLoader;
