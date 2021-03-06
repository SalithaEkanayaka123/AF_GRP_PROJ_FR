import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useDispatch} from "react-redux";
import Auth from './ProtectedRoutes/AuthenticationClass';

//Importing Custom Style Sheet. 
import styles from './style';
import '../../CSS/loginstyle.css';
import {loginUser} from "../../actions/users";
const Login = () => {
  const classes = styles();

  const dispatch = useDispatch();

  //Methods comes here.
  const [userData, setUserData] = useState(
    {
      userName: '',
      password: ''
    }
  );

  const [password, setPassword] = useState();
  const [token, setToken] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  }

    const login = async () => {
        try {
            const {data} = await axios.post("http://localhost:8093/api/v1/validate", userData);
            setToken(data.jwt);
            //Auth.login(token, userData); //Change this to Redux.
            //Create the state object to save in the store.
            const user = {
               "user-name": userData.userName,
               "user-token": data.jwt,
               "user-type": "user"
            }
            dispatch(loginUser(user));

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="login-component">
        <div className="login-border">
            <div className="header">
                <h2 className="main-header">Login</h2>
                <h4 className="second-header">Information</h4>
            </div>
          </div>

            <div className="login-body">
              <div className="input-wrapper">
                <lable>Name</lable><br/>
                <input className="input-field"
                       placeholder="Enter Name..."
                       type="text"
                       value={userData.userName}
                       onChange={(e) => setUserData({...userData, userName:e.target.value})}
                />
                <br/>
              </div>
              <div className="input-wrapper">
                <lable>Password</lable><br/>
                <input className="input-field"
                       placeholder="Enter Password..."
                       type="password"
                       value={userData.password}
                       onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
              </div>
            
            <div className="button-group">
              <button className="auth-button" type="submit">Login</button><br/>
              <button className= "auth-button">Registration</button>
              <div className="button-group-link">Forgot Password?</div>
            </div>
            </div>
      </div>
      </form>
    </div>
  )

}

export default Login;
