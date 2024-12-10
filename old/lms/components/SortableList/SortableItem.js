import React from "react"
import { makeStyles } from "@mui/styles"
import { sortableElement, sortableHandle } from "react-sortable-hoc"

const useStyles = makeStyles(() => ({
  listItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}))

const DragHandle = sortableHandle(({ children }) => (
  <div className="my-2 w-full">{children}</div>
))

const SortableItem = sortableElement(({ component }) => {
  const classes = useStyles()

  return (
    <li className={classes.listItem}>
      <DragHandle>{component}</DragHandle>
    </li>
  )
})

export default SortableItem
