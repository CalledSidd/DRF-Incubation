import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Admin from "../../pages/Admin";


function AdminDashboard() {
    let   [newapp, setNewapp]             = useState([])
    let   [offset, setOffset]             = useState(0)
    const [reloader, setRealoader]        = useState(2)
    const [username, setUsername]         = useState("")
    const [address, setAddress]           = useState("")
    const [city, setCity]                 = useState("")
    const [state, setState]               = useState("")
    const [phone, setPhone]               = useState("")
    const [company_name, setCompany_name] = useState("")
    let {authTokens}                      = useContext(AuthContext)
useEffect(() => {
    newApps();
}, [offset, reloader])

async function newApps() {
    await axios.post('http://127.0.0.1:8000/applications', {}).then((response) => {
            console.log(response)
            setNewapp(response.data)
        }).catch((error) => {
            console.log(error)
        })
}
return (
    <div className="container mt-5">
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

export default AdminDashboard