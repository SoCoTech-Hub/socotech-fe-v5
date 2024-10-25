import Link from "next/link";

const index = ({
  img = "coming_soon.jpg",
  title = "Title Here",
  imgAlt = title,
  description = "text here",
  link,
}) => (
  <Link href={link} passHref>
    <div className="bg-compBg desktop:w-72 laptop:w-64 mobile:w-full shadow-menu cursor-pointer rounded-lg">
      <div className="flex place-self-center">
        {img.startsWith("https") ? (
          <div className="mx-auto">
            <img
              src={`${img}`}
              alt={imgAlt}
              className="my-4 h-44 w-60 object-cover"
            />
          </div>
        ) : (
          <img
            src={`/digilib/${img}`}
            alt={imgAlt}
            className="h-44 w-60 object-cover"
          />
        )}
      </div>
      <div className="heading px-4 leading-none">{title}</div>
      <div className="body-text px-4 py-2 leading-6">{description}</div>
    </div>
  </Link>
);

export default index;
