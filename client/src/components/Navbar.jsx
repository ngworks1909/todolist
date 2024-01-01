import React,{useContext} from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import '../css/Navbar.css'
import { FaSun,FaMoon } from "react-icons/fa6";
import { ModeContext } from '../context/ModeContext';
import { BiLogOut } from "react-icons/bi";
import { Link ,useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png'
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {dark,setDark} = useContext(ModeContext);
  const {setLoggedIn,setAuthToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('token');
    setAuthToken('');
    setLoggedIn(false);
    navigate('/login');

  }
  return (
        <div className={`nav-bar ${dark && 'darkMode'} display-flex align-center justify-between`}>
        <div className="app-logo">
            <Link to="/" className='display-flex align-center app-logo-link'>
                <img src={logo} className='app-logo-image' alt="" />
                <span className='app-logo-text'>ToDo</span>
            </Link>
        </div>
        <div className="menu-list display-flex align-center">
           <div className='display-flex align-center justify-center menu-icon-button'><HiDotsHorizontal className='menu-icon cursor-pointer'/>
               <div className="box display-flex flex-column">
                    <button className='display-flex align-center  gap-1' onClick={(e)=>{e.preventDefault();setDark(!dark)}}>
                        {dark ? <FaSun className='hidden-icon'/>:<FaMoon className='hidden-icon'/>}
                        <span>{dark?`Light Mode`:`Dark Mode`}</span>
                    </button>
                    <button className='display-flex align-center gap-1' onClick={logout}>
                        <BiLogOut className='hidden-icon'/>
                        <span>Logout</span>
                    </button>
               </div>
           </div>
        </div>
       </div>
  )
}

export default Navbar
