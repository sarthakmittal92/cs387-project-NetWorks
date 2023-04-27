import { NavLink } from 'react-router-dom'
// import { useAuth } from './auth'
import { useNavigate} from 'react-router-dom'
import "./navbar.css"

export const Navbar = () => {

    const navigate = useNavigate()
    
    
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
                <NavLink to='/job' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Jobs</NavLink>
              </li>

              <li target="_blank" class="active2">
                <NavLink to='/chat' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Chat</NavLink>
              </li>

              <li target="_blank" class="active3">
                  <NavLink to='/profile' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Profile</NavLink>
            </li>  
            <li target="_blank" class="active3">
                  <NavLink onClick={handleLogout} to='/' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Sign out</NavLink>
            </li>  
          </ul>
        </nav>
      </div>
   
  )
}
