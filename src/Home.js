import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';
const Home = () => {
    const { searchResults,fetchError,isloading} = useContext(DataContext)
    return (
        <main className="Home">
           {isloading && <p className='statusMsg'>Loading posts....</p>}
           {!isloading && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
           {!isloading && 
            !fetchError && 
            (searchResults.length? 
             <Feed posts={searchResults}/>
              : <p className='statusMsg'>No posts to display</p>)
            }
        </main>
    )
}

export default Home
