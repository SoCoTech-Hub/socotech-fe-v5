import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  ListItem,
} from "@mui/material"

import { makeStyles, withStyles } from "@mui/styles"

export const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    "&$focusVisible": {
      backgroundColor: "#6255D0",
      color: "#ffffff",
    },
    "&$selected, &$selected:hover": {
      backgroundColor: "#6255D0",
      color: "#ffffff",
    },
  },
}))

export const LessonListDisplay = withStyles({
  root: {
    color: "#000",
    boxShadow: "none",
    backgroundColor: "#F1F3F6",
    fontSize: "12px",
    "&:hover": {
      // backgroundColor: "rgba(255,172,49,0.25)",
    },
  },
  expanded: {},
})(Typography)

export const LessonListItem = withStyles({
  root: {
    fontSize: "12px",
    overflow: "hidden",
    "&:last-child": {},
    boxShadow: "none",
    "&:hover": {},
  },
  expanded: {},
})(ListItem)

export const Accordion = withStyles({
  root: {
    fontSize: "12px",
    // border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "none",

    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion)

export const AccordionSummary = withStyles({
  root: {
    fontSize: "12px",
    borderRadius: "24px",
    marginBottom: -1,
    minHeight: 60,
    "&$expanded": {
      minHeight: 60,
    },
    "& .MuiAccordionSummary-expandIcon": {
      // backgroundColor: "#FFAC31",
      color: "white",
      padding: "5px",
    },

    // padding: 0,
  },
  content: {
    "&$expanded": {},
  },
  expanded: {},
})(MuiAccordionSummary)

export const AccordionDetails = withStyles(() => ({
  root: {
    fontSize: "12px",
    padding: "0px",
  },
}))(MuiAccordionDetails)
