import { Rating } from "@mui/material"
import { withStyles } from "@mui/styles"

export const StyledRating = withStyles({
  iconFilled: {
    color: "#000",
  },
  iconEmpty: {
    color: "#000",
    stroke: "#000",
    opacity: '0.7'
  },
  iconHover: {
    color: "#000",
  },
})(Rating)
