import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { setInfo } from '../reducers/infoReducer'
import { useState } from 'react'


const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

// LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({username, password})
    dispatch(setInfo(user))
  }

   return (
     <div className='container'>
       <h2>Login</h2>

       <form onSubmit={handleLogin}>
         <div>
           username
           <input
             value={username}
             onChange={({ target }) => setUsername(target.value)}
             id="username"
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={({ target }) => setPassword(target.value)}
             id="password"
           />
       </div>
         <button type="submit" id="login-button">login</button>
       </form>
     </div>
   )
}

export default LoginForm