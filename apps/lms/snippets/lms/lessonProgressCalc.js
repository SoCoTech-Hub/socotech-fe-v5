const lessonProgressCalc = ({ completedSteps, totalSteps }) =>
  completedSteps
    ? totalSteps > 0
      ? Math.round((completedSteps / totalSteps) * 100)
      : 100
    : 0
export default lessonProgressCalc
