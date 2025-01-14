import { Button } from "../button";
import { Skeleton } from "../skeleton";

export interface DigilibHeaderProps {
  name: string;
  loading: boolean;
  category: string;
  subject: string;
  backOnClick?: () => void;
}

export const DigilibHeader: React.FC<DigilibHeaderProps> = ({
  name,
  category,
  subject,
  loading,
  backOnClick,
}) => {
  return (
    <div className="shadow-menu flex w-full flex-row gap-x-4 rounded-lg bg-primary p-4">
      <div className="gap-y-2">
        {loading ? (
          <Skeleton className="mb-2 h-6 w-48" />
        ) : (
          <h1 className="text-lg font-bold leading-tight text-primaryForeground md:text-xl">
            {name}
          </h1>
        )}
        {loading ? (
          <Skeleton className="h-10 w-72 md:w-80 lg:w-96" />
        ) : (
          <h2 className="text-3xl font-semibold leading-tight text-primaryForeground md:text-4xl lg:text-5xl">
            {category} {subject}
          </h2>
        )}
      </div>
      {!loading && !backOnClick && (
        <Button
          onClick={backOnClick}
          className="mt-4 text-primaryForeground"
          variant="outline"
        >
          Back
        </Button>
      )}
    </div>
  );
};
