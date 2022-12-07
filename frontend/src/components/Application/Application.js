import React, { useContext, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


function Application() {
    let {user, logout}      =  useContext(AuthContext)
    let {authTokens}        = useContext(AuthContext)
    const [limit, setLimit] = useState(false)
    const Navigate          = useNavigate()

    useEffect(() => {
        if(authTokens){
            
        }else{
            Navigate('/login')
        }
        if(jwtDecode(authTokens.access).is_superuser){
            Navigate('/admin')
        }
        async function check(){
            await axios.get("http://127.0.0.1:8000/checkApplication", {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authTokens.access}`
                }
            }).then((response) => {console.log(response)}
            ).catch((error) => { console.log(error) 
                setLimit(true)
                function nav() {
                    Navigate('')
                }
            })
        }
    }, [])
    const [username, setUsername] = useState(()=> user ? user.username:"")
    const [address, setAddress]   = useState("")
    const [state, setState]       = useState("")
    const [city, setCity]         = useState("")
    const [email, setEmail]       = useState("")
    const [phone, setPhone]       = useState("")
    const [company_name, setCompany_name] = useState("")


const formHandler = async (e) => {
    e.preventDefault()
    console.log(e)
    console.log(company_name)
    if (username.length === 0){
        alert("Fill All Fields Properly")
    }
    else if (email.length === 0){
        alert("Fill All Fields Properly")
    }
    else{
        console.log("Form Successful")
        await axios.post("http://127.0.0.1:8000/registerApplication",
        {
        data:{
            "username" : username,
            "address":address,
            "city" : city,
            "state": state,
            "email":email,
            "phone":phone,
            "company_name": company_name
        },

        },{
            headers:{
                'Content-Type'  : 'application/json',
                "Authorization" : `Bearer ${authTokens.access}` 
            }
            }
        ).then((response) => {
            console.log(response)
            alert("Successfully registered")
        }).catch((error)=> {
            console.log(error)
        })
    }
}

    

    return (
        <div>
            <div className="contact">
                
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="fs-5 text-center content-bold mb-0 mt-5 mb-5">Application Form For Incubation</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={formHandler}>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name='name'
                                            onChange={(e)=> setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label for="exampleFormControlTextarea1" className="form-label">Address</label>
                                        <textarea
                                            className="form-control"
                                            rows="1"
                                            id="address"
                                            name='address'
                                            onChange={(e)=> setAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label for="exampleInputEmail1" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            name='city'
                                            onChange={(e)=> setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label for="exampleInputEmail1" className="form-label">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="state"
                                            name='state'
                                            onChange={(e)=> setState(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name='email'
                                            onChange={(e)=> setEmail(e.target.value)}
                                        />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name='phone'
                                            onChange={(e)=> setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Company Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="company_name"
                                            name='company_name'
                                            onChange={(e)=> setCompany_name(e.target.value)}
                                        />
                                    </  div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Describe Your Team and Background</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="background"
                                        name='background'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Describe Your Company and Products</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="products"
                                        name='products'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Describe the problem you are trying to solve</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="problem"
                                        name='problem'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">What is unique about your solution?</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="unique"
                                        name='unique'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">What is your value proposition for the customer?</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="proposition"
                                        name='proposition'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Who are the competitors and what is your competitive advantage?</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="competitive_advantage"
                                        name='competitive_advantage'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Explain your revenue model</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="revenue"
                                        name='revenue'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">What is the potential market size of the product?</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="address"
                                        name='address'

                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">How to you market or plan to market your products and services?</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="address"
                                        name='address'

                                    />
                                </div>
                                <label for="exampleFormControlTextarea1" className="form-label">Type of Incubation needed</label>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="incubation"
                                        id="physical"
                                    />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Physical Incubation
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="radio"
                                        name="incubation"
                                        id="virtual"
                                    />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Virtual Incubation
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Upload a detailed business proposal</label>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        id="proposal"
                                        name='proposal'
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark mt-4 mb-4">Submit</button>
                            <div class="d-flex justify-content-end">
                        <button onClick={logout} className="btn btn-dark mt-4 mb-4">Logout</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Application