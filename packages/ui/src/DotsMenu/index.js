import * as React from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MoreIcon className="w-10 h-10" />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleClose}>Save This</MenuItem>
      </Menu>
    </div>
  )
}

export const MoreIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-supported-dps="24x24"
    fill="currentColor"
    className="mercado-match"
    width="1em"
    height="1em"
    {...props}>
    <path d="M14 12a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM4 10a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm16 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
  </svg>
)
