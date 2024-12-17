import { Skeleton } from "../skeleton";
import Help from "./help";

export interface WelcomeProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  loading?: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({
  imageUrl = "/default_welcome.png",
  title = "Hello, how can we help you?",
  subtitle = "Tell us what you are looking for in the search bar below, select a category, and we will help you find what you need.",
  loading = false,
}) => (
  <div className="bg-digilibWelcome shadow-menu flex flex-col rounded-lg p-6 lg:flex-row lg:gap-6">
    <div className="flex items-center justify-center py-4 lg:w-1/3">
      {loading ? (
        <Skeleton className="h-48 w-48 rounded-lg lg:w-full" />
      ) : (
        <img
          src={imageUrl}
          alt="Welcome Image"
          className="h-48 w-full rounded-lg object-contain lg:h-auto"
        />
      )}
    </div>
    <div className="flex flex-col justify-center lg:w-2/3">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
      <div className="mt-4">
        {loading ? <Skeleton className="h-12 w-full" /> : <Help />}
      </div>
    </div>
  </div>
);

export default Welcome;
