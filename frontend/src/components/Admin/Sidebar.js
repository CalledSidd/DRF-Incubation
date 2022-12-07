import React, {useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Sidebar.css'
import { NavLink } from "react-router-dom";


function Sidebar() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto min-vh-100 bg-dark position-sticky ">
                    <ul>
                        <li>
                        <NavLink to='/admin'>
                            <p className="nav-link pt-5 px-3 text-primary">
                                <i className="bi-house " /><span className="ms-3 d-none d-sm-inline text-white">Home</span>
                            </p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/new'>
                            <p className="nav-link pt-5 px-3 text-primary">
                            <i className="bi-speedometer" /><span className="ms-3 d-none d-sm-inline text-white">New</span>
                            </p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/list'>
                            <p className="nav-link pt-5 px-3 text-primary">
                            <i className="bi-heart" /><span className="ms-3 d-none d-sm-inline text-white">Record</span>
                            </p>
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to='/admin/slot'>
                            <p className="nav-link pt-5 px-3 text-primary">
                            <i className="bi-badge-4k" /><span className="ms-3 d-none d-sm-inline text-white">Slots</span>
                            </p>
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    )
}
export default Sidebar