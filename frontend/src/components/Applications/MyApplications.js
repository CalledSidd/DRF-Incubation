import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import authTokens from '../../context/AuthContext'

function MyApplications() {
    let {user, logout} = useContext(AuthContext)
    let {authTokens} = useContext(AuthContext)
    const Navigate = useNavigate()

    useEffect(() => {
        if(authTokens){
            
        }else{
            Navigate('/login')
        }
        
    }, [])


    return (
        <>
            <div className='container fixed-top '>
                <h5 className='text-center pt-5'>Your Application has been received we will be contacting you soon</h5>
            <button onClick={logout} className="btn btn-dark text-start">Logout</button>
            </div>
        </>
    )
}
export default MyApplications