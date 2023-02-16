import Feed from './Feed';

const Home = ({ posts,fetchError,isloading }) => {
    return (
        <main className="Home">
           {isloading && <p className='statusMsg'>Loading posts....</p>}
           {!isloading && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
           {!isloading && 
            !fetchError && 
            (posts.length? 
             <Feed posts={posts}/>
              : <p className='statusMsg'>No posts to display</p>)
            }
        </main>
    )
}

export default Home
