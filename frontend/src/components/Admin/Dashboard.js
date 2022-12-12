import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Admin from "../../pages/Admin";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jwtDecode from "jwt-decode";


function AdminDashboard() {
    let [newapp, setNewapp] = useState([])
    let [offset, setOffset] = useState(0)
    const [modalopen, setModalopen] = useState(false)
    const [reloader, setRealoader] = useState(false)
    const [username, setUsername] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phone, setPhone] = useState("")
    const [company_name, setCompany_name] = useState("")
    const [type_of, setTypeof] = useState("")
    let { authTokens } = useContext(AuthContext)
    const Navigate = useNavigate()



    useEffect(() => {
        console.log(authTokens.access)
        newApps();
    }, [offset, reloader])

    async function newApps() {
        await axios.get('http://127.0.0.1:8000/applications', {}).then((response) => {
            console.log(response)
            setNewapp(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <div className="container mt-5 fixed-top text-center">
                <h4 className="text-center">Requests</h4> <hr />
                {modalopen ? <ViewApp></ViewApp> : ""}
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">User</th>
                            <th scope="col">View</th>
                            <th scope="col"></th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newapp.map((data, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.company_name}</td>
                                    <td>{data.created_at.substring(0, 10)}</td>
                                    <td>{data.user}</td>
                                    <td><button className="btn btn-dark"
                                        onClick={() => {
                                            console.log("Open has been initiated")
                                            setUsername(data.user)
                                            setAddress(data.address)
                                            setCity(data.city)
                                            setState(data.city)
                                            setPhone(data.phone)
                                            setCompany_name(data.company_name)
                                            setTypeof(data.typeof)
                                            setModalopen(true)
                                            
                                        }}>Open</button></td>
                                        <ViewApp 
                                        show  = {modalopen}
                                        onHide = { () => setModalopen(false)} />
                                    <td><button className="btn btn-dark" onClick={async () => {
                                        console.log(authTokens.access)
                                        await axios.get(`http://127.0.0.1:8000/approveApplication/${data.id}`, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${authTokens.access}`
                                            }
                                        }).then((response) => {
                                            setRealoader(!reloader)
                                        }).catch((error) => { console.log(error) })
                                    }}
                                    >Approve</button>
                                        <button className="btn btn-dark mx-2"
                                            onClick={async () => {
                                                console.log("Deny Application")
                                                await axios.get(`http://127.0.0.1:8000/declineApplication/${data.id}`, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': `Bearer ${authTokens.access}`
                                                    }
                                                }).then((response) => {
                                                    setRealoader(!reloader)
                                                }).catch((error) => { console.log(error) })
                                            }}
                                        >Deny</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

    function ViewApp(props) {
        return (
            <div>
                <Modal
                {...props}
                size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {company_name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p> Username : {username}</p>
                        <p> Company  : {company_name}</p>
                        <p> Phone    : {phone}</p>
                        <p> Address  : {address}, {state}, {city}</p>
                        <p> Type of  : {type_of}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AdminDashboard