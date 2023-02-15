import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogDetail } from '../reducers/detailReducer'
 import {addCommentBlog } from '../reducers/blogsReducer';
import { addLike } from '../reducers/blogsReducer';

const BlogDetail = () => {
    const info = useSelector(({ info }) => info)
    const blog = useSelector(({ detail }) => detail)
    const dispatch = useDispatch()
    const param = useParams()

    useEffect(() => {
      dispatch(getBlogDetail(param.id))
    }, [dispatch])

  const handleSubmit = (event) => {
      const payload = { ...blog, comments: blog.comments.concat( event.target.comment.value) }
      event.target.comment.value=''
      dispatch(addCommentBlog(payload))
  }

  const handleLike = () => {
    const newBlog = {...blog, likes: blog.likes + 1 }
    dispatch(addLike(newBlog))
  }

  return (
    <div className='container'>
        <h2>blogs</h2>

        <p>{info?.name} logged in</p>

        <h1><b>{blog?.title}</b></h1>

        <p><a href={`${blog?.url}`}>{blog?.url}</a></p>
        <p>like :  {blog?.likes} <button onClick={handleLike}>Like</button></p>
        <p>added by {blog?.author}</p>

        <h3>comments</h3>
        <div>
        <form onSubmit={handleSubmit}>
        <input type="text" name="comment"/> <button type="submit" id="submit-blog-form">Add comment</button>
        </form>
        </div>
        <div>
        {blog?.comments.map(comment => (
          <div key={comment}>
            <li>{comment}</li>
          </div>
        ))}
        </div>
    </div>
  )
}

export default BlogDetail