import { makeStyles, withStyles } from "@mui/styles"
import MenuItem from "@mui/material/MenuItem"
import { Menu } from "@mui/material"

// Modal Styling
export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 5,
}
// Modal Styling End

// Menu Styling
export const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "&:hover": {
      borderRadius: "10px",
    },
    display: "flex",
  },
  margin: {
    margin: "0 0 0 0 ",
  },
  extendedIcon: {
    marginRight: "0 0 0 0",
  },
}))

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "16px",
    paddingTop: "5px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    disableRipple
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
        borderRadius: "10px",
      },
    },
    padding: "5px",
    borderRadius: "8px",
  },
}))(MenuItem)
// Menu Styling End
