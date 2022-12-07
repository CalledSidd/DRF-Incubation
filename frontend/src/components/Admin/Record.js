import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";


function Record(){
    let   [decapp, setDecapp]             = useState([])
    let   [appapp, setAppapp]             = useState([])
    let   [offset, setOffset]             = useState(0)
    const [modalopen, setModalopen]       = useState(false)
    const [reloader, setRealoader]        = useState(2)
    const [username, setUsername]         = useState("")
    const [address, setAddress]           = useState("")
    const [city, setCity]                 = useState("")
    const [state, setState]               = useState("")
    const [phone, setPhone]               = useState("")
    const [company_name, setCompany_name] = useState("")
    let {authTokens}                      = useContext(AuthContext)

useEffect(() => {
    console.log(authTokens.access)
    decApps();
    appApps();
}, [offset, reloader])

async function decApps() {
    await axios.get('http://127.0.0.1:8000/viewDeclined', {}).then((response) => {
            console.log(response)
            setDecapp(response.data)
        }).catch((error) => {
            console.log(error)
        })
}

async function appApps() {
    await axios.get('http://127.0.0.1:8000/viewApproved', {}).then((response) => {
        console.log(response)
        setAppapp(response.data)
    }).catch((error) => {
        console.log(error)
    })
}
    return(
        <div className="container mt-5 fixed-top text-center">
            <h5 className="text-center">Declined Applications</h5>
            <hr/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {decapp.map((data, index) => {
                            return (
                                <tr>
                                <td>{data.company_name}</td>
                                <td>{data.created_at.substring(0,10)}</td>
                                <td>{data.user}</td>
                                </tr>
                            )
                        })}
                        
                </tbody>
            </table>
            <div className="container mt-5 pt-5 fixed-center text-center">
            <h5 className="text-center">Approved Applications</h5>
            <hr/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {appapp.map((data, index) => {
                            return (
                                <tr>
                                    <td>{data.company_name}</td>
                                    <td>{data.created_at.substring(0, 10)}</td>
                                    <td>{data.user}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
        </div>
        
    )
}

export default Record