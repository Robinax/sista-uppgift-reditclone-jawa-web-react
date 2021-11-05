import './App.css';
import {useHistory} from "react-router-dom"
import React,{ useState,} from 'react';
import {BrowserRouter,Switch,Route,NavLink} from "react-router-dom"
import { logoutUser} from './Service/Users/UserService';
import Register from './Register';
import Login from './Login'
import PostWall from './PostWall';

function App() {
const [token,setToken] = useState('');
const history = useHistory();
const [username,setUsername] = useState('');
const [logedin,setlogedin] = useState(false);
const initiallLogoutUserUrl ='http://localhost:8080/user/logout'

const logout = () => {
  logoutUser(initiallLogoutUserUrl,token)
  setlogedin(false);
  setToken('');
  alert("You now logged out of " + username);
}

if (logedin === false) {
  return (
  
    <div className="App">
      <BrowserRouter>
        <div className="header" style={{display:"flex",justifyContent:"center", border:"1px solid", borderBlockColor:"blueviolet", padding:"10px", backgroundColor:"cornflowerblue"}} >
          <NavLink exact activeClassName="active" to="/" style={{padding:"5px", }}>Register</NavLink>
          <NavLink activeClassName="active" to="/login" style={{padding:"5px"}}>Login</NavLink>
          <NavLink activeClassName="active" to="/postwall" style={{padding:"5px"}}>PostWall</NavLink>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/postwall" component={  () => <PostWall  username={username} setUsername={setUsername} logedin={logedin} token={token} setToken={setToken}/>} />
            <Route exact path="/login" component={  () => <Login setToken={setToken} token={token} logedin={logedin} setlogedin={setlogedin}
            username={username} setUsername={setUsername} />} /> 
          </Switch>
        </div>
        </BrowserRouter>
    </div>
  );
}
else {
  return (
  
    <div className="App">
      <BrowserRouter>
        <div className="header" style={{display:"flex",justifyContent:"center", border:"1px solid", borderBlockColor:"blueviolet", padding:"10px", backgroundColor:"cornflowerblue"}}>
          <NavLink activeClassName="active" to="/postwall" style={{padding:"5px"}}>PostWall</NavLink>
          <NavLink activeClassName="active" to="/login" onClick={logout} style={{padding:"5px"}}>Logout</NavLink>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/postwall" component={  () => <PostWall  username={username} setUsername={setUsername} logedin={logedin} token={token} setToken={setToken}/>} />
            <Route exact path="/login" component={  () => <Login setToken={setToken} token={token} logedin={logedin} setlogedin={setlogedin} 
            username={username} setUsername={setUsername}/>} /> 
          </Switch>
        </div>
        </BrowserRouter>
    </div>
  );
}
}

export default App;
