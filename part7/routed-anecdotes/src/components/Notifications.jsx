import React from 'react'

const Notifications = ({notification,setNotification}) => {
    setTimeout(() => {
        setNotification('')
    },2000)
  return (
      <div>{notification}</div>
  )
}

export default Notifications