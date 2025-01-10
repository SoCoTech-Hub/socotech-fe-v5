interface LessonProgressParams {
  completedSteps: number;
  totalSteps: number;
}

export default function lessonProgressCalc({
  completedSteps,
  totalSteps,
}: LessonProgressParams): number {
  if (!totalSteps || totalSteps <= 0) {
    return 0; // Avoid division by zero or invalid totalSteps
  }

  if (completedSteps < 0) {
    completedSteps = 0; // Ensure no negative completed steps
  }

  return Math.round((completedSteps / totalSteps) * 100);
}