import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Signup() {

    const navigate = useNavigate()
    const [username, setUsername]   = useState("")
    const [email, setEmail]         = useState("")
    const [password, setPassword]   = useState("")
    const [password2, setPassword2] = useState("")


  let signup = async (e) => {
    e.preventDefault()
    console.log("Signup Function has been called")
    if (password !== password2){
        alert("passwords do not match")
    }
    else{
        console.log("If condition has been checked")
        await axios.post("http://127.0.0.1:8000/signup", {
            "username" : e.target.username.value,
            "email"    : e.target.email.value,
            "password" : e.target.password.value,  

        }).then((response) => {
            console.log(response.data)
            if(response.data === 200){
                navigate('/login')
            }
        }).catch((error) => {
            console.log(error)
            if(error.reponse.data === 'Email already exists'){
                alert("Email already exists")
            }
        })
    }
}
    return(
        <div className="container pt-5">
        <div className="container pt-5">
        <div className="row justify-content-center mt-3 mb-3 pt-5">
          <div className="col-md-5">
            <h3>SignUp</h3>
            <br/>
            <Form onSubmit={signup}>
            <div className="mb-3">
                <label class="form-label" for="form2Example2"></label>
                <input type="text" onChange={(e) => {
                    setUsername(e.target.value)
                }} controlId="formBasicUsername" class="form-control" placeholder="Username"  name="username"/>
              </div>
               <div className="mb-3">
                <label class="form-label" for="form2Example2"></label>
                <input type="email" onChange={(e) => {
                    setEmail(e.target.value)
                }} controlId="formBasicUsername" class="form-control" placeholder="Email" name="email"/>
              </div>
              <div className="mb-3">
                <label class="form-label" for="form2Example2"></label>
                <input type="password" onChange={(e) => {
                    setPassword(e.target.value)
                }} controlId="formBasicPassword" class="form-control" placeholder="Password" name="password" />
              </div>
              <div className="mb-3">
                <label class="form-label" for="form2Example2"></label>
                <input type="password" onChange={(e) => {
                    setPassword2(e.target.value
                        )
                }} controlId="formBasicPassword" class="form-control" placeholder="Confirm Password" name="password2" />
              </div>
              <Button variant="dark" type="submit" >
                SignUp
              </Button>
            </Form>
              <Link to='/login'>
              <Button variant="dark-outline">
                <span>Login</span>
                </Button>
              </Link>
          </div>
          </div>
        </div>
      </div>
    );
}

export default Signup