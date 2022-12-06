import React, {useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Sidebar.css'


function Sidebar() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto min-vh-100 bg-dark">
                    <ul>
                        <li>
                            <a className="nav-link pt-5 px-3 text-primary">
                                <i className="bi-house " /><span className="ms-3 d-none d-sm-inline text-white">Home</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link pt-5 px-3 text-primary">
                            <i className="bi-speedometer" /><span className="ms-3 d-none d-sm-inline text-white">New</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link pt-5 px-3 text-primary">
                            <i className="bi-heart" /><span className="ms-3 d-none d-sm-inline text-white">Record</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link pt-5 px-3 text-primary">
                            <i className="bi-badge-4k" /><span className="ms-3 d-none d-sm-inline text-white">Slots</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    )
}
export default Sidebar