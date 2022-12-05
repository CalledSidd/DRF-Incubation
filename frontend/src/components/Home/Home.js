import React, {useState, useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";


function Home() {
    let {user} = useContext(AuthContext)
    return (
        <div className='container'>
            HomePage
            {user && <p>Hello You are Loggged in {user.username}</p>}
        </div>
    );
}

export default Home