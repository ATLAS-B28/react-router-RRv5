import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {data,fetchError,isloading} = useAxiosFetch('http://localhost:3001/posts')
  useEffect(() => {
    setPosts(data);
  }, [data]);
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);
  //children refers to components within the DataProvider
  return (
    <DataContext.Provider
      value={{
        //we can pass the props through this provider
        search,
        setSearch,
        searchResults,
        posts,
        isloading,
        fetchError,
        data,
        setPosts
      }}
    >
      {children}
    </DataContext.Provider>
  );
}; //we will provide data with this func\
export default DataContext;
