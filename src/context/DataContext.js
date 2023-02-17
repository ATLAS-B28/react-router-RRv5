import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";
import { format } from "date-fns";
import api from "../api/posts";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  //state for editing
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useHistory();
  const { width } = useWindowSize();
  const { data, fetchError, isloading } = useAxiosFetch(
    "http://localhost:3001/posts"
  );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      //empty the from after submission
      setPostBody("");
      setPostTitle("");
      //re-route to root
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleUpdate = async (id) => {
    //2 things are fixed
    const datetime = format(new Date(), "MMMM dd ,yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  //children refers to components within the DataProvider
  return (
    <DataContext.Provider
      value={{
        //we can pass the props through this provider
        width,
        search,
        setSearch,
        searchResults,
        isloading,
        fetchError,
        handleSubmit, 
        postTitle, 
        setPostTitle, 
        postBody, 
        setPosts,
        setPostBody,
        posts,
        editTitle,
        editBody,
        setEditTitle,
        setEditBody,
        handleUpdate,
        handleDelete,
        data
      }}
    >
      {children}
    </DataContext.Provider>
  );
}; //we will provide data with this func\
export default DataContext;
