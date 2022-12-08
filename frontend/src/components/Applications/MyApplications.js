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
        <div className="container mt-5">
            <h5>Your Applications </h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Application Number</th>
                        <th scope="col">Status</th>
                        <th scope="col">Room Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}
export default MyApplications