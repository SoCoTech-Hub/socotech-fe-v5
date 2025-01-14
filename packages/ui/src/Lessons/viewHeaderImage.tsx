export interface HeaderImageProps {
  headerImageUrl: string;
  headerImageAlt: string;
}

export const HeaderImage: React.FC<HeaderImageProps> = ({
  headerImageUrl,
  headerImageAlt,
}) => {
  return (
    <div className="relative mb-4 h-48 w-full">
      <img
        src={headerImageUrl}
        alt={headerImageAlt}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
