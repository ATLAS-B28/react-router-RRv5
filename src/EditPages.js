import React, { useEffect } from 'react'
import { useParams,Link,useHistory } from 'react-router-dom'
import { useStoreActions,useStoreState } from 'easy-peasy'
import { format } from 'date-fns'

const EditPages = () => {
  const history = useHistory()
  const {id} = useParams()
  const editTitle = useStoreState((state)=>state.editTitle)
  const editBody = useStoreState((state)=>state.editBody)
  const getPostById = useStoreState((state)=>state.getPostById)
  const post = getPostById(id)
  const setEditTitle = useStoreActions((actions)=>actions.setEditTitle)
  const setEditBody = useStoreActions((actions)=>actions.setEditBody)
  const editPosts = useStoreActions((actions)=>actions.editPosts)
  
  useEffect(()=>{
    if(post)
    setEditTitle(post.title)
    setEditBody(post.body)
  },[post,setEditTitle,setEditBody])

  const handleUpdate = (id) => {
    //2 things are fixed
    const datetime = format(new Date(), "MMMM dd ,yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };
    editPosts(updatedPost)
    history.push(`/post/${id}`)
  };

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
         type='button' 
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
