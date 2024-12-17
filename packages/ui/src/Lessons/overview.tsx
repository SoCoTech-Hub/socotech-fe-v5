export interface LessonOverviewProps {
  overview: string;
  duration: string;
  presenter: string;
}

const LessonOverview: React.FC<LessonOverviewProps> = ({
  overview,
  duration,
  presenter,
}) => {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Lesson Overview</h3>
      <p>{overview}</p>
      <div className="mt-4 flex flex-col sm:flex-row sm:gap-8">
        <div>
          <span className="font-semibold">Duration:</span>
          <span className="ml-2">{duration}</span>
        </div>
        <div>
          <span className="font-semibold">Presented by:</span>
          <span className="ml-2">{presenter}</span>
        </div>
      </div>
    </section>
  );
};

export default LessonOverview;
