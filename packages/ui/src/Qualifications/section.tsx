export const Section: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <div className="mb-4">
    <h3 className="mb-2 font-semibold">{title}</h3>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);
