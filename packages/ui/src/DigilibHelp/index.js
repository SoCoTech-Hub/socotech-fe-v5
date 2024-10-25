import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { baseUrl, organizationId } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

import { StyledMenu, StyledMenuItem } from "./styles";

const index = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState("Category");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    await getGQLRequest({
      endpoint: `kbCategories`,
      where: `organization:{id:${organizationId}}`,
      stateSetter: setCategories,
      fields: `id,name`,
    });
  }, []);

  const searchQuery = ({ searchValue }) => {
    category == "Category"
      ? setSearch(`name_contains=${searchValue}`)
      : setSearch(
          `category=${
            categories[categories.findIndex((item) => item.name == category)]
              ?.id
          }&name_contains=${searchValue}`,
        );
  };

  const searchResult = () => {
    router.push(`/search?${search}`);
  };

  return (
    <div className="">
      <div className="bg-compBg align-items-center mt-4 flex flex-row justify-between rounded-lg px-2">
        <div className="">
          <button
            className="text-textColor bg-digilibWelcomeButton h-8 w-36 rounded-full"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {category}
          </button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {categories.length ? (
              categories?.map((category) => {
                return (
                  <div key={category.id}>
                    <StyledMenuItem>
                      <div className="flex justify-between">
                        <button
                          className="item mt-2"
                          onClick={() => {
                            setCategory(category.name), setAnchorEl(null);
                          }}
                        >
                          {category.name}
                        </button>
                      </div>
                    </StyledMenuItem>
                  </div>
                );
              })
            ) : (
              <StyledMenuItem>
                <div className="flex justify-between">Coming Soon</div>
              </StyledMenuItem>
            )}
          </StyledMenu>
        </div>
        <div className="col-xs-4 ml-2 w-full">
          <input
            className="form-control h-10 border-0 shadow-none"
            type="text"
            placeholder="Start typing to search..."
            onChange={(e) => searchQuery({ searchValue: e.target.value })}
          />
        </div>
        <div className="-mb-1.5">
          <button onClick={searchResult}>
            <div className="w-10 rounded-full p-1">
              <img src={`${baseUrl}/search_icon.svg`} alt="Search Icon" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
