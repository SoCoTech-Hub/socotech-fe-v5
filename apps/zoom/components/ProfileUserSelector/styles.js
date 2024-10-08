import { Tab, Tabs } from "@mui/material"
import { makeStyles, withStyles } from "@mui/styles"

export const StyledTab = withStyles(() => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontSize: 15,
    marginRight: { spacing: 1 },
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab {...props} />)

export const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 30,
      width: "100%",
      backgroundColor: "#6E757C",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: { spacing: 3 },
  },

  demo2: {
    backgroundColor: "none",
  },
  tabs: {
    color: "rgba(75, 85, 99)",
  },
}))
