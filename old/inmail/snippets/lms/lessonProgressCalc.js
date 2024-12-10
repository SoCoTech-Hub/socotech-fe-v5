const lessonProgressCalc = ({ completedSteps, totalSteps }) =>
  completedSteps ? Math.round((completedSteps / totalSteps) * 100) : 0
export default lessonProgressCalc
