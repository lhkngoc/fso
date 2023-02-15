import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom"
import About from "./About"
import Anecdote from "./Anecdote"
import AnecdoteList from "./AnecdoteList"
import CreateNew from "./CreateNew"
import Notifications from "./Notifications"

const Menu = ({anecdotes,setAnecdotes,notification,setNotification}) => {
    const padding = {
      paddingRight: 5
    }
    return (
        <Router>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
        <Notifications notification={notification} setNotification={setNotification} />
        <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route path="anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />}/>
            <Route path="/create" element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotification={setNotification} />} />
            <Route path="/about" element={<About />} />
        </Routes>
        </Router>
    )
}

export default Menu