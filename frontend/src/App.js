import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import Application from './pages/Application';
import Signup from './pages/Signup';

function App() {
    return (
        <>
        <div className="App">
            <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />}/>
                    {/* <Route path ='/' element={<Home />} /> */}
                    <Route path='/' element={<Application/>} />
                    <Route path='/signup' element={<Signup/>}/>
                </Routes>
            </AuthProvider>
            </Router>
        </div>
        </>
    );
}

export default App;