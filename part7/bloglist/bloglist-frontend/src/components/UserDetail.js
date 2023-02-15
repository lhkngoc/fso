import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserDetail } from '../reducers/detailReducer'


const UserDetail = () => {
  const info = useSelector(({ info }) => info)
  const user = useSelector(({ detail})=>detail)
  const dispatch = useDispatch()
  const param = useParams()

  useEffect(() => {
    dispatch(getUserDetail(param.id))
    console.log("user",user)
  }, [dispatch])

  return (
    <div className='container'>
        <h2>blogs</h2>

      <p>{info?.name} logged in</p>

      <h1>{user?.username}</h1>

      <p><b>added blogs</b></p>
      <ul>
        {user?.blogs.map(blog => (
          <div key ={blog.id}>
            <li>{blog.title}</li>
          </div>
        ))}
        </ul>
    </div>
  )
}

export default UserDetail