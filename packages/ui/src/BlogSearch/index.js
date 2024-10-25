import { useState } from "react";
import {
  AppBg,
  baseUrl,
  grades,
  organizationId,
  Text,
} from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

const index = ({ setSearchFound, articles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const date = new Date().toISOString();

  const SearchBlog = () => {
    if (searchTerm) {
      getGQLRequest({
        endpoint: `articles`,
        stateSetter: setSearchFound,
        where: `_or:[{description_contains:"${searchTerm}"}, {title_contains:"${searchTerm}"}], grades:{id:[${grades}]},organization:{id:${organizationId}}`,
        fields: `id,title,description,published_at,image{url,formats},articleLike{id},author{firstName,lastName,profilePic{id,url,formats}}`,
        sort: `title:asc`,
      });
      setSearchTerm("");
    } else {
      setSearchFound(articles);
    }
  };

  return (
    <div className="bg-compBg align-items-center text-textColor mobile:px-1 mt-4 flex flex-row justify-between rounded-lg px-2">
      <div className="col-xs-4 ml-2 w-full">
        <input
          className={`text-textColor bg-compBg w-full rounded-lg border-0 px-2 py-1 shadow-none`}
          style={{
            background: AppBg,
          }}
          type="text"
          placeholder="Start typing to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="-mb-1.5">
        <button onClick={() => SearchBlog()}>
          <div className="w-10 rounded-full p-1">
            <img src={`${baseUrl}/search_icon.svg`} alt="Search Icon" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default index;
