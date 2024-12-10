import { Menu, MenuItem } from "@mui/material"
import { withStyles } from "@mui/styles"

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "25px",
    paddingTop: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
})((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))

export const StyledMenuItem = withStyles(() => ({
  root: {
    "&:focus": {
      backgroundColor: "#fff",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#000",
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#000",
      },
    },
    padding: "5px",
    borderRadius: "8px",
  },
}))(MenuItem)
