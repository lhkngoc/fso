import React from 'react'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'

import Togglable from './Togglable'
import {useSelector } from 'react-redux'

import BlogList from './BlogList'

const Home = () => {

    const user = useSelector(({ info }) => info)

  return (
    <div className='container'>
        <h1>Blogs</h1>
    {user === null ?
        <Togglable buttonLabel='login'>
            <LoginForm/>
        </Togglable> : (
        <div>
        <Togglable buttonLabel="new blog">
             <BlogForm />
        </Togglable>
            <BlogList/>
    </div>
  )
}
    </div>
  )
}

export default Home