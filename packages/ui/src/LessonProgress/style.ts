import { LinearProgress, Rating, linearProgressClasses } from "@mui/material"
import { styled } from "@mui/material/styles"
import { withStyles } from "@mui/styles"

// BorderLinearProgress component
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#63D480" : "#63D480",
  },
}))

// StyledRating component
export const StyledRating = withStyles({
  iconFilled: {
    color: "#FCEE21",
  },
  iconEmpty: {
    color: "#fef",
  },
  iconHover: {
    color: "#FCcc00",
  },
})(Rating)
