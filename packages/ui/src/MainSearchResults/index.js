import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Btn from "@/components/Btn";
import Pagination from "@/components/Pagination";

const index = ({ results }) => {
  const router = useRouter();
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const goBack = () => {
    router.back();
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return results?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, results]);
  return (
    <div className="bg-compBg shadow-menu rounded-lg">
      <div className="flex justify-between">
        <div className="text-textColor pb-3 pl-8 pt-4 text-left text-lg font-bold">
          Your Search Results
        </div>
        <div className="mr-6 mt-3">
          <Btn
            label="Back"
            color="bg-themeColorMain"
            onClickFunction={goBack}
            width="36"
            padding="px-3 py-2"
          />
        </div>
      </div>
      <div className="ml-8 mr-8">
        <hr className="bg-compBg" />
      </div>
      <div className="mobile:overflow-scroll mobile:w-full">
        {currentTableData?.length > 0 ? (
          <>
            <table className="">
              <thead>
                <tr>
                  <th className="text-textColor py-4 pl-8">Name</th>
                  <th className="text-textColor py-4 pr-20">Type</th>
                  <th className="text-textColor py-4 pr-10">Topic</th>
                  <th className="text-textColor py-4 pr-10">Language</th>
                  <th className="text-textColor py-4 pr-10">Subject</th>
                </tr>
              </thead>
              <tbody>
                {currentTableData?.map((result) => (
                  <Link href={`/${result.id}`} key={result.id} passHref>
                    <tr>
                      <td
                        style={{
                          width: "30%",
                        }}
                        className="text-textColor py-2 pl-4 pr-10 text-xs font-extrabold"
                      >
                        {result.name}
                      </td>
                      <td
                        style={{
                          width: "15%",
                        }}
                        className="text-textColor py-2 pr-7 text-xs"
                      >
                        {result.categories[0]?.name}
                      </td>
                      <td
                        style={{
                          width: "25%",
                        }}
                        className="text-textColor py-2 pr-7 text-xs"
                      >
                        {result.topics?.map((topic, index) => (
                          <>
                            {topic.name}{" "}
                            {index !== result.topics?.length - 1 && ", "}
                          </>
                        ))}
                      </td>
                      <td
                        style={{
                          width: "10%",
                        }}
                        className="text-textColor py-2 pr-7 text-xs"
                      >
                        {result.language}
                      </td>
                      <td
                        style={{
                          width: "20%",
                        }}
                        className="text-textColor py-2 pr-7 text-xs"
                      >
                        {result.subject?.name}
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={results ? results.length : 0}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        ) : (
          <div className="text-textColor pb-3 pl-8 pr-20 pt-4 text-left text-lg font-bold">
            No Results Found
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
