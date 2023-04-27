import React from "react"
import { useNavigate,useLocation } from "react-router-dom";
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    MDBIcon,
  }
  from 'mdb-react-ui-kit';

export const Login  = ({ setAuth }) => {

    const location = useLocation();    
    const redirectPathS =  location.state?.path  ||  '/home';
    const navigate = useNavigate();
    const showToastMessage = (dat,val) => {
        if(val){
            toast.success(dat, {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.error(dat, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    };

    const func = () =>{
        var checkBox = document.getElementById("reg-log");
        checkBox.checked = !checkBox.checked;
    }

    const Auth_U = ()=>{

        var user_id = document.getElementById("llogemail").value;
        var password = document.getElementById("llogpass").value;
        console.log(user_id,password,"reached here1");
        if(user_id.length === 0 || password.length === 0){
            console.log(user_id,password,"reached here");
          showToastMessage('Username or Password Field is Empty',0);
        }else{
          fetch('http://localhost:5001/Q1', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                user_id: user_id,
                password: password
            }),
            })
          .then((response) => response.json())
          .then((dat) => {
              if(dat.value){
                showToastMessage(dat.result,1); 
                navigate(redirectPathS, { replace: true });
              }
              else{
                showToastMessage(dat.result,0); 
              }
          })
          .catch((err) => {
            console.log(err.message);
          });
        }
  
      }

    return(
        <>
        <div className="section p">
        <ToastContainer />
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <div className="form-group">
                                                    <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="llogemail" />
                                                    <MDBIcon className="input-icon uil uil-at" fas icon="user me-3" size='lg'/>
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="llogpass" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div onClick={Auth_U} className="btn mt-4">Login</div>
                                                <div className="mb-0 mt-4 text-center"><div onClick={func} className="btn link">New user? Click here to Register!</div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                <div className="form-group">
                                                    <input type="text" name="logname" className="form-style" placeholder="Your User Name" id="slogname" />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="slogemail" />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="slogpass" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <a href="/l" className="btn mt-4">Register</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}