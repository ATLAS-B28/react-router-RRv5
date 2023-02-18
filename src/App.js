import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPages from "./EditPages";
import About from "./About";
import Missing from "./Missing";
import { Route, Switch} from "react-router-dom";
import {useStoreActions} from 'easy-peasy'
//import { DataProvider } from "./context/DataContext";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useEffect } from "react";
function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const {data,fetchError,isloading} = useAxiosFetch("http://localhost:3002/posts")
  useEffect(()=>{
      setPosts(data)
  },[data,setPosts])
  return (
    <div className="App">
      
        <Header title="React JS Blog By ACB" />
        {/**<DataProvider>*/}
        <Nav/>
        <Switch>
          <Route exact path="/">
           <Home
            fetchError={fetchError}
            isloading={isloading}
           />
          </Route>
          <Route exact path="/post" component={NewPost}/>
          <Route path="/edit/:id" component={EditPages}/>
          <Route path="/post/:id" component={PostPage}/>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
        {/**</DataProvider>*/}
        <Footer />
      
    </div>
  );
}

export default App;
