import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MyApps from './pages/MyAppl;ications';
import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import Application from './pages/Application';
import Signup from './pages/Signup';
import Admin from './pages/Admin'
import AdminDashboard from './components/Admin/Dashboard';
import Record from './components/Admin/Record';
import Slot from './components/Admin/Slots';
import NewApps from './components/Admin/New';



function App() {
    return (
        <>
        <div className="App">
            <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/login'   element={<Login />}/>
                    <Route path='/signup'  element={<Signup/>}/>
                    <Route path='/myapps'  element= {<MyApps/>}/>
                    <Route path='/'        element={<Application/>} />
                    <Route path ='/admin'  element={<Admin />}>
                        <Route path = ''   element={<AdminDashboard/>}/>
                        <Route path='new'  element={<NewApps/>}/>
                        <Route path='list' element={<Record/>}/>
                        <Route path='slot' element={<Slot/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
            </Router>
        </div>
        </>
    );
}

export default App;