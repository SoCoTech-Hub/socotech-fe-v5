import { baseUrl } from "@/context/constants";

const index = () => {
  return (
    <div className="card mobile:p-1 mobile:mb-5 bg-themeColorMain w-full p-4">
      <div className="space-y-6">
        <div className="mobile:mr-0 mobile:p-1 mobile:text-xl mr-24 pr-10 text-4xl font-bold leading-tight text-black">
          Indulge in blog brilliance that'll have you hooked from the first
          sentence.
        </div>
        <div className="desktop:hidden laptop:hidden float-right mt-6">
          <img
            src={`${baseUrl}/blog_welcome.gif`}
            alt="Blog Welcome Image"
            className="mx-2 object-contain"
            height={120}
            width={120}
          />
        </div>

        <div className="mobile:p-1 mobile:mr-0 mobile:w-4/5 mr-28 w-3/4">
          <p className="mobile:text-sm py-2 text-xl font-normal leading-tight text-black">
            A whirlwind of wisdom, and wild adventures. It's the ultimate brain
            buffet, serving up captivating stories and mind-blowing insights.
          </p>
        </div>
      </div>
      <div className="mobile:hidden absolute bottom-20 right-10">
        <img
          src={`${baseUrl}/blog_welcome.gif`}
          alt="Blog Welcome Image"
          className="mx-2 object-contain"
          height={120}
          width={120}
        />
      </div>
    </div>
  );
};

export default index;
