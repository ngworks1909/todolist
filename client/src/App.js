import './App.css';
import { useEffect,useContext } from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';



function App() {
  
  const {setAuthToken,loggedIn,setLoggedIn} = useContext(AuthContext);

  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        setAuthToken(token);
        setLoggedIn(true);
      }
      // eslint-disable-next-line
  },[])


  return (
    <Router>
      <Routes>
        <Route  path='/'  element={!loggedIn ? <Login/>:<Home/>}></Route>
        <Route  path='/login'  element={<Login/>}></Route>
        <Route  path='/register' element={<Register/>}></Route>
      </Routes>
     </Router>

  );
}

export default App;
