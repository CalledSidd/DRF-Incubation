import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function Login() {
    let {login, authTokens} = useContext(AuthContext)
    const Navigate = useNavigate()

    useEffect(() => {
      if (authTokens){
        Navigate('/')
      }
      else{
        
      }
    }, [])
  return (
    <div className="container pt-5">
      <div className="container pt-">
      <div className="row justify-content-center mt-3 mb-3 pt-5">
        <div className="col-md-5">
          <h3>Login</h3>
          <br/>
          <Form onSubmit={login}>
              <div className="mb-3">
                <label class="form-label" for="form2Example2">Username</label>
                <input name="username" type="text" controlId="formBasicUsername" class="form-control" placeholder="Username" />
              </div>
              <div className="mb-3">
                <label class="form-label" for="form2Example2">Password</label>
                <input type="password" name="password" controlId="formBasicPassword" class="form-control" placeholder="Password"/>
              </div>
            <Button variant="dark" type="submit" onSubmit={login}>
              Login
            </Button>
            <Link to='/signup'>
              <Button variant="dark-outline">
                <span>SignUp</span>
                </Button>
              </Link>
          </Form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
