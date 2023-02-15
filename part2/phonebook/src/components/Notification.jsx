import React from 'react'

const Notification = ({mess,color}) => {
  return (
    <div>
        <div className={color}>
          <p>{mess}</p>
        </div>
    </div>
  )
}

export default Notification