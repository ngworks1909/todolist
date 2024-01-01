import React,{ useContext, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import '../css/Login.css'
import Alert from '../components/Alert';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [err,setErr] = useState(false);
  const [msg, setMsg] = useState('');

  const {setAuthToken, setLoggedIn} = useContext(AuthContext);


  const handleLogin = async (e) =>{
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      const response = await fetch(`http://localhost:3001/api/auth/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                },
              body: JSON.stringify({email, password}),
      });
      const json = await response.json();
      if(json.success){
        const {authToken} = json;
        localStorage.setItem('token', authToken);
        setAuthToken(authToken);
        setLoggedIn(true);
        navigate("/");
      }
      else{
        setErr(true);
        setMsg(json.error);
        setTimeout(() => {
          setErr(false);
          setMsg('');
        }, 3000);
      }
  }
  return (
    <>
       {err && <Alert type={'danger'} message={msg}/>}
       <div className="container-2 display-flex align-center justify-center">
       <div className="signup display-flex align-center flex-column">
           <h2 className='login-h2'>Login</h2>
           <form onSubmit={handleLogin} className="login-form display-flex flex-column">
            
                <div className="form-floating mb-3">
                   <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                   <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <input type="submit" className="btn btn-primary login-submit"value={"Login"}/>
           </form>
           <span className='not-user display-flex'>New user?<Link to="/register">Register</Link></span>
       </div>

     </div>
      
    </>
  )
}