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
import { DataProvider } from "./context/DataContext";
//dataprovider is now providing 
//all the data,procedures,fetch and crud oprators
function App() {
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
  //useEffect(() => {
    //setPosts(data);
  //}, [data]);

  
  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog By ACB" />
        <Nav/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/post">
            <NewPost/>
          </Route>
          <Route path="/edit/:id">
            <EditPages/>
          </Route>
          <Route path="/post/:id">
            <PostPage/>
          </Route>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
