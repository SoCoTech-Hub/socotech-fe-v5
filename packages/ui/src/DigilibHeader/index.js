import { useRouter } from "next/router";
import Btn from "@/components/Btn";
import DigilibLoad from "@/components/DigilibLoad";

const index = ({ name, loading, category, subject }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="bg-digilibWelcome shadow-menu flex w-full flex-row justify-between rounded-lg p-3">
      <div className="">
        <div className="banner-main-text text-digilibWelcomeFont pb-1 pl-4 pt-2 font-bold leading-tight">
          {name}
        </div>
        <div className="text-textColor desktop:text-5xl laptop:text-4xl mobile:text-3xl pb-3 pl-4 leading-tight">
          {category} {subject}
        </div>
        <Btn
          label="Back to List"
          onClickFunction={goBack}
          color="bg-themeColorMain"
        />
      </div>
      <div className="flex items-center pr-4 align-middle">
        <DigilibLoad loading={loading} />
      </div>
    </div>
  );
};

export default index;
