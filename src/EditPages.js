import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
const EditPages = ({posts,editTitle,editBody,setEditTitle,setEditBody,handleUpdate}) => {
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  //we trigger useEffect with dependencies  - setEditTitle,setEditBody,post 
  //we do this to set the state we look for the post ,its title and body
  
  useEffect(()=>{
    if(post)
    setEditTitle(post.title)
    setEditBody(post.body)
  },[post,setEditTitle,setEditBody])
  return (
   <main className='NewPost'>
    {editTitle
     &&
     <>
      <h2>Edit Page</h2>
      <form className='newPostForm' onSubmit={e=>e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input 
         type="text" 
         id='postTitle'
         required
         //set the true value
         value={editTitle}
         onChange={e=>setEditTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <input 
         type="text"
         id='postBody'
         required
         value={editBody}
         onChange={e=>setEditBody(e.target.value)} 
        />
        <button 
         type='submit' 
         onClick={()=>handleUpdate(post.id)}
         //here it will access the particular post and therefore we need
         //to pass an id unlike the submit 
         //where we put only reference to the handleSubmit function 
        >
            Submit Edit
        </button>
      </form>
     </>
    }
    {!editTitle
     &&
     <>
      <h2>Post not found</h2>
      <p>Well, that's disappointing.</p>
      <p>
        <Link to='/'>Visit Our Homepage</Link>
      </p>
     </>
    }
   </main>
  )
}

export default EditPages
