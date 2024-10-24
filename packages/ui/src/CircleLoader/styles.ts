import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

export const useStylesFacebook = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.mode === "light" ? 200 : 700], // Changed to `mode` since `type` is deprecated
  },
  top: {
    color: "#898d91",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}))
