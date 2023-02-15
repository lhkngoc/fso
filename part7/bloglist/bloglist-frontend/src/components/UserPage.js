import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserPage = () => {

  const users = useSelector(({ users }) => users)

    return (
    <div className='container'>
        <h2>Users</h2>
        
        <ul>
        <p> blogs created</p>
          {users.map(user => (
            <div key={user.id}>
              <div>
              <Link to={`/users/${user.id}`} key={user.id}> {user.username} </Link>
              </div>
              <div>
              {user.blogs.length}
              </div>
            </div>

         ))}
        </ul>
    </div>
  )
}

export default UserPage