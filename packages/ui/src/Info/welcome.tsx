interface IndexProps {
  title: string;
  description: string;
  image: React.ReactNode;
}

export const InfosWelcome = ({ title, description, image }: IndexProps) => (
  <div
    className="desktop:p-4 laptop:p-4 mobile:p-2 card w-full"
    style={{ background: "#81cc71" }}
  >
    <div className="desktop:space-y-6 laptop:space-y-6 mobile:space-y-0">
      <div className="mobile:mr-0 mobile:p-1 mobile:text-xl mr-24 pr-10 text-4xl font-bold leading-tight text-black">
        {title}
      </div>
      <div className="mobile:p-1 mobile:mr-0 mobile:w-4/5 mr-28 w-3/4">
        <p className="mobile:text-sm mobile:py-0 py-2 text-xl leading-tight text-black">
          {description}
        </p>
      </div>
    </div>
    <div className="mobile:hidden absolute right-4 -mt-4 px-5">{image}</div>
    <div className="mobile:w-20 mobile:h-30 mobile:right-2 desktop:hidden laptop:hidden mobile:visible mobile:px-2 absolute">
      {image}
    </div>
  </div>
);
