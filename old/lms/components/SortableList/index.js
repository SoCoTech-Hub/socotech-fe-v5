import { sortableContainer } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"

const SortableContainer = sortableContainer(({ children }) => {
  return <ul style={{ listStyle: "none" }}>{children}</ul>
})

const SortableList = ({ questions, handleQuestionChange, children }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    handleQuestionChange(arrayMoveImmutable(questions, oldIndex, newIndex))
  }

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {children}
    </SortableContainer>
  )
}

export default SortableList
