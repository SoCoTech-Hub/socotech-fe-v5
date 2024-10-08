import { useState } from "react"
import InputFieldRound from "../InputFieldRound"

const SearchBar = ({}) => {
  const [query, setQuery] = useState("")
  // const [data, setData] = useState([]);
  // const fuse = new Fuse(data, {
  //   keys: ["name", "topic","description","presenter"],
  //   includeScore: true,
  // });

  // useEffect(async () => {
  //   await getGQLRequest({endPoint: `lessons`, stateSetter: setData});
  // }, []);

  // const results = fuse.search(query);
  // const searchResults = results.map((result) => result.item);

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget
    setQuery(value)
  }

  return (
    <>
      <InputFieldRound
        icon="ti-search"
        placeholder="Start typing to search"
        list="datalistOptions"
        value={query}
        onChange={handleOnSearch}
        dataTour="searchbar"
      />
      {/* //TODO:Complete result list
      {searchResults ? (
        <datalist id="datalistOptions">
          {searchResults.map((item) => (
            <option key={item.title}>{item.title}</option>
          ))}
        </datalist>
      ) : (
        <></>
      )} */}
    </>
  )
}
export default SearchBar
