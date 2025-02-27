
import BursaryWelcomeBanner from "../../../../../packages/ui/src/Bursaries/tour";
import { Button } from "../../../../../packages/ui/src/button";
import ContentLock from "../../../../../packages/ui/src/ContentLock";
import DigilibCategories from "../../../../../packages/ui/src/Digilib/categories";

//TODO: fix components
interface BursaryCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  iconSvg?: string;
}

interface BursariesProps {
  bursaryCategories: BursaryCategory[];
}

const Bursaries = ({ bursaryCategories }: BursariesProps) => {
  return (
    <div>
      <BursaryWelcomeBanner />
      <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 flex justify-end">
        <Button title="Back" link={`/bursaries`} color="bg-themeColorMain" />
      </div>
      <ContentLock
        isPaying={isPaying}
        bgColor={"bg-themeColorMain"}
        children={
          <>
            <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-5 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
              {bursaryCategories?.map((bursary) => (
                <DigilibCategories link={""} />
              ))}
            </div>
          </>
        }
      />
    </div>
  );
};

export default Bursaries;
