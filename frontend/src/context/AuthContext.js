import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import swal from 'sweetalert'
const AuthContext = createContext()




export default AuthContext


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState( ()=> localStorage.getItem('authTokens') ?  JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(useState(() => localStorage.getItem('authTokens') ?  jwt_decode(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState()
    const navigate = useNavigate()




    const login = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON',
                
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        let data = await response.json()
        
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            console.log(authTokens)

            if((jwtDecode(data.access).is_superuser)){
                navigate('/admin')
            }else{
                navigate('/')
            }

    }
}

    let updateToken = async () =>{
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {'refresh':authTokens.refresh}
                )
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }else{
            logout()
        }
        
    }



    useEffect(() => {
        let fiveminutes = 1000 * 60 * 10
        let interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, fiveminutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])


    let logout= () => {
        swal({
            title : "Are you sure you want to logout",
            icon : "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if(willDelete){
            console.log("Logged Out")
            setAuthTokens(null)
            localStorage.removeItem('authTokens')
            navigate('/login')
        } else {

        }
        })
    }


    let contextData = {
        user : user, 
        login : login,
        authTokens : authTokens,
        logout : logout
    }

    return ( 
        <AuthContext.Provider value = {contextData}>{
            loading ? null : children}
        </AuthContext.Provider>
    )
}
