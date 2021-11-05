import React,{ useState, useEffect} from 'react';
import {useHistory} from "react-router-dom"
import { loginUser} from './Service/Users/UserService';

function Login(props) {
    const history = useHistory();
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const initialUrlLogin = 'http://localhost:8080/user/login'

    const loginhandler = (e) =>{
        e.preventDefault();
        if (props.logedin === true) {
            alert("You are already logged in!")
        }
        else if(username === '' || password === ''){
            alert("Username or password is empty..")
        }
        else{
                const token = loginUser(initialUrlLogin, username,password, props.setlogedin);
                token.then(actualToken => props.setToken(actualToken))
                props.setUsername(username);
                if (props.logeding === true) {
                    history.push('/postwall')
                }
                
        }
    }
    const gotoRegister = () =>{
        history.push('/')
    }
  


    return (

      <div className="App">
          <h3>Login</h3>
        <form onSubmit={loginhandler}>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input><br/>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input><br/>
            <button>Login</button>
        </form>
        <button style={{backgroundColor:'rgba(52,52,52,0'}}onClick={gotoRegister}>Dont have an account? Go to register here!</button>
      </div>

    
    );
  }

  export default Login;