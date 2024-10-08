import Essay from "@/components/Quiz/Essay"
import FillBlank from "@/components/Quiz/FillBlank"
import FreeChoice from "@/components/Quiz/FreeChoice"
import MatrixSort from "@/components/Quiz/MatrixSort"
import MultipleChoice from "@/components/Quiz/MultipleChoice"
import SingleChoice from "@/components/Quiz/SingleChoice"
import SortingChoice from "@/components/Quiz/SortingChoice"

const typesAnswerObjects = {
  "lesson.single-choice-quiz": {
    key: "single_answer",
    answer_key: "answer",
    ReactComponent: SingleChoice,
    object: {
      is_correct: false,
      answer: "",
      // points: 10,
      media: null,
    },
  },
  "lesson.multiple-choice-quiz": {
    key: "answer",
    answer_key: "answer",
    ReactComponent: MultipleChoice,
    // ReactComponent: MatrixSort,
    object: {
      is_correct: false,
      answer: "",
      // points: null,
      media: null,
    },
  },
  "lesson.free-choice": {
    key: "correct_answer",
    ReactComponent: FreeChoice,
    answer_key: "answer",
    object: {
      answer: "",
    },
  },
  "lesson.fill-blank": {
    key: "answer",
    ReactComponent: FillBlank,
    answer_key: "answer",
  },
  "lesson.essay": {
    key: "keyword",
    ReactComponent: Essay,
    answer_key: "keyword",
    object: {
      keyword: "",
    },
  },
  "lesson.sorting-choice": {
    key: "answer",
    ReactComponent: SortingChoice,
    answer_key: "answer",
    object: {
      answer: "",
    },
  },
  "lesson.matrix-sorting": {
    key: "criterion_answer",
    ReactComponent: MatrixSort,
    answer_key: "answer",
    object: {
      criterion: "",
      answer: "",
    },
  },
}
export default typesAnswerObjects
