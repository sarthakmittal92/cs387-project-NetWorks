import { NavLink } from 'react-router-dom'
// import { useAuth } from './auth'
import { useNavigate} from 'react-router-dom'
import "./navbar.css"
import { useState,useEffect } from "react";

export const Navbar = () => {

    const navigate = useNavigate()
    const [user_name,setuser_name] = useState('');
    
    const handleLogout = () => {
        fetch('http://localhost:5001/Q5', {
          method: 'POST',   
          headers: {
            'Content-type': 'application/json',
          },
          credentials:'include',
          withCredentials:true,
        })
            .then((response) => response.json())
            .then((dat) => {     
            })
            .catch((err) => {
              console.log(err.message);
            });
        navigate('/')
      }

      useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q8', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({}),
            }).then((response) => response.json());
            setuser_name(dat.userName);
            
          })();
    },[])

  return (
    <div align="center" class="navigation">
        <nav align="center" class="nav-type1">
          <ul align="center" class="nav-type">

            <li target="_blank"  class="active1">
                <NavLink to='/home' class="nav-link"><i class="fas fa-tachometer-alt"></i>Home</NavLink>
            </li>

            <li target="_blank" class="active2">
                  <NavLink to='/network' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Network</NavLink>
            </li>

              <li target="_blank" class="active2">
                <NavLink to='/jobs' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Jobs</NavLink>
              </li>

              <li target="_blank" class="active2">
                <NavLink to='/chat' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Chat</NavLink>
              </li>

              <li target="_blank" class="active3">
                  <NavLink to={'/profile/'+user_name} class="nav-link" ><i class="fas fa-tachometer-alt"></i>Profile</NavLink>
            </li>  
            <li target="_blank" class="active3">
                  <NavLink onClick={handleLogout} to='/' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Sign out</NavLink>
            </li>  
          </ul>
        </nav>
      </div>
   
  )
}
