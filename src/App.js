import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPages from './EditPages';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch'
import useWindowSize from './hooks/useWindowSize'
import { format } from 'date-fns';
import api from './api/posts';

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  //state for editing
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const history = useHistory();
  const {width} = useWindowSize()
  const {data,fetchError,isloading} = useAxiosFetch("http://localhost:3001/posts")

 // useEffect(() => {
   // const fetchPosts = async () => {
     // try {
       // const response = await api.get('/posts');
        //setPosts(response.data);
      //} catch (err) {
        //if (err.response) {
          // Not in the 200 response range 
          //console.log(err.response.data);
          //console.log(err.response.status);
          //console.log(err.response.headers);
        //} else {
          //console.log(`Error: ${err.message}`);
        //}
     // }
    //}
   


   // fetchPosts();
  //}, [])
  //replacing it with
   //set the state
   useEffect(()=>{
    setPosts(data)
   },[data])

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { 
       id,
       title: postTitle,
       datetime, 
       body: postBody
    };
    try {
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts,response.data]
      setPosts(allPosts)
      //empty the from after submission
      setPostBody('')
      setPostTitle('')
      //re-route to root 
      history.push('/')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleUpdate = async (id)=>{
     //2 things are fixed 
     const datetime = format(new Date(), 'MMMM dd ,yyyy pp')
     const updatedPost = {
      id,
      title:editTitle,
      datetime,
      body:editBody
     }
     try {
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data}:post))
      setEditTitle('')
      setEditBody('')
      history.push('/')
     } catch (error) {
      console.log(`Error : ${error.message}`)
     }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title="React JS Blog By ACB" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home 
           posts={searchResults} 
           fetchError={fetchError}
           isloading={isloading}
          />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/edit/:id">
         <EditPages
          posts={posts}
          handleUpdate={handleUpdate}
          editTitle={editTitle}
          editBody={editBody}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
         />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
