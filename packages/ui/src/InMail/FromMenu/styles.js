import { withStyles } from "@mui/styles"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "8px",
    paddingTop: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
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
