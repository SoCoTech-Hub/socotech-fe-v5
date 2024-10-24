import { Badge, BadgeProps } from "@mui/material"
import { withStyles } from "@mui/styles"

// Modal Styling
export const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
  borderRadius: 25,
}
// Modal Styling End

export const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 30,
    borderRadius: "5px",
    color: "#fff",
    backgroundColor: "#FFAC31",
    marginRight: "15px",
    height: "60%",
    width: "15%",
  },
}))(Badge) as React.ComponentType<BadgeProps>

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto" as "auto",
    bottom: "auto" as "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}
