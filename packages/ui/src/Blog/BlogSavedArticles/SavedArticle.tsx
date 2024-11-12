import Link from "next/link";
import BtnSm from "@/components/BtnSm";
import { baseUrl, profileId } from "@/context/constants";
import handleArticleDelete from "@/snippets/blog/handleArticleDelete";
import Clamp from "react-multiline-clamp";

interface SavedArticleProps {
  imgSrc?: string;
  title: string;
  description: string;
  blogPostId: string;
  setSavedArticlesList: (articles: any[]) => void; // Update `any[]` with the specific type if available
}

const SavedArticle: React.FC<SavedArticleProps> = ({
  imgSrc,
  title,
  description,
  blogPostId,
  setSavedArticlesList,
}) => {
  const deleteArticle = async () => {
    await handleArticleDelete(blogPostId, profileId, setSavedArticlesList);
  };

  const mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`;

  return (
    <div>
      <div className="align-items-center flex w-full cursor-pointer rounded-lg px-2 py-4 shadow-md">
        <a href={`${baseUrl}/${blogPostId}`}>
          <div className="mr-2 w-1/3">
            <div className="w-20 overflow-hidden rounded-lg">
              <img
                src={mediaUrl}
                alt="Blog Image"
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        </a>
        <div className="w-2/3">
          <div className="w-full">
            <a href={`${baseUrl}/${blogPostId}`}>
              <div>
                <div className="text-textColor line-clamp-1 w-full text-lg leading-none">
                  <Clamp lines={1}>
                    <div dangerouslySetInnerHTML={{ __html: title }} />
                  </Clamp>
                </div>
                <div className="text-textColor line-clamp-2 w-full pt-1 text-xs">
                  <Clamp lines={2}>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </Clamp>
                </div>
              </div>
            </a>
            <div className="mt-2 flex w-full">
              <BtnSm
                color="bg-themeColorMain"
                label="Delete"
                onClickFunction={() => deleteArticle()}
                trackingAction={`Delete article: ${title}`}
                id={blogPostId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedArticle;
