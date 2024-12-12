import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Btn from "@/components/Btn";
import DigilibLoad from "@/components/DigilibLoad";
import Pagination from "@/components/Pagination";
import { profileId } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

// import FilterDropdown from "@/components/FilterDropdown"
// import { useAppContext } from '@/context/AppContext'

const index = ({
  articles,
  category,
  // filters,
}) => {
  const [loading, setLoading] = useState(false);
  const [progresses, setReads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  // Fetch read progress data
  useEffect(() => {
    const fetchProgressData = async () => {
      await getGQLRequest({
        endpoint: "kbReads",
        fields: "read,knowledgeBase{id}",
        where: `kbCategory:${category.id},profile:${profileId}`,
        stateSetter: setReads,
      });
    };
    fetchProgressData();
  }, [category.id]);

  // Reset page when articles change
  useEffect(() => {
    setCurrentPage(1);
  }, [articles]);

  // Memoize the current page data
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return articles?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, articles]);

  // Helper function to render the progress status
  const renderReadStatus = (articleId) => {
    const progress = progresses.find(
      (item) => item.knowledgeBase.id === articleId,
    );
    return progress?.read ? "Read" : "Unread";
  };

  // Helper function to render the article row
  const renderArticleRow = (article) => {
    const link = article.link?.startsWith("http")
      ? article.link
      : `/${article.link}`;

    return (
      <Link href={`/${article.id}`} key={article.id} passHref>
        <tr onClick={() => setLoading(true)} className="cursor-pointer">
          <td className="text-textColor mobile:px-2 mobile:py-2 w-1/2 px-8 py-4 text-sm">
            {article.name}
          </td>
          <td className="text-textColor mobile:hidden w-1/3 px-8 py-4 text-sm">
            {article.topics?.map((topic) => topic.name).join(", ") || " "}
          </td>
          <td className="text-textColor desktop:hidden laptop:hidden w-1/3 px-8 py-4 text-sm">
            {article.topics?.map((topic) => topic.name).join(", ") || " "}
            <div
              className={
                renderReadStatus(article.id) == "Read"
                  ? "text-themeColorMain"
                  : "text-textColor"
              }
            >
              {renderReadStatus(article.id)}
            </div>
          </td>
          <td
            className={`mobile:hidden w-1/12 px-8 py-4 text-xs font-extrabold ${
              renderReadStatus(article.id) == "Read"
                ? "text-themeColorMain"
                : "text-textColor"
            }`}
          >
            {renderReadStatus(article.id)}
          </td>
        </tr>
      </Link>
    );
  };

  return (
    <div className="bg-compBg overflow-hidden rounded-lg shadow-md">
      <div className="mobile:gap-2 flex justify-between gap-5">
        <div className="text-textColor mobile:pl-4 pb-3 pl-8 pt-4 text-lg">
          {category?.name}
        </div>
        <div className="mr-6 mt-3">
          <Btn
            label="Back"
            color="bg-themeColorMain"
            onClickFunction={() => router.back()}
          />
        </div>
        {/* <div className="">
          <FilterDropdown
            filterName="Filter by"
            filters={filters}
            setOption={setOption}
          />
        </div> */}
        {/* {option ? (
          <div className="">
            <FilterDropdown
              filterName="Options"
              filters={optionFilters}
              // setOption={setFilter}
            />
          </div>
        ) : (
          <div className=""></div>
        )} */}
      </div>

      <hr className="bg-compBg text-textColor mx-8" />
      <div className="mobile:mx-1 mx-8">
        <table className="w-full">
          <thead>
            <tr>
              {/* <th className="px-8 py-4 text-gray-600 ">
                Number
              </th> */}
              <th className="text-textColor mobile:hidden px-8 py-4 text-sm">
                Title
              </th>
              <th className="text-textColor mobile:hidden px-8 py-4 text-sm">
                Tag
              </th>
              <th className="text-textColor mobile:hidden px-8 py-4 text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody>{currentTableData?.map(renderArticleRow)}</tbody>
        </table>
        <div className="flex justify-center align-middle">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={articles ? articles.length : 0}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div className="mx-2 flex justify-center align-middle">
        <DigilibLoad loading={loading} />
      </div>
    </div>
  );
};

export default index;
