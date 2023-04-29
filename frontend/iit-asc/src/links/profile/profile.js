import "./profile.css"
import React from "react"
import { useState,useEffect } from "react";
import { Navbar} from '../navbar/navbar'
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
export const Profile = () => {
    /*
    {user_name:"",user_photo:"",email:,place:,desc:,cur_work:,isrec:,iscur:,reqstring:,total_post:,total_conn:}
     */
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const user_name = params.user_name;
    const [user_photo,setuser_photo] = useState(user_name);
    const [email,setemail] = useState('');
    const [place,setplace] = useState('');
    const [desc,setdesc] = useState('');
    const [cur_work,setcur_work] = useState('');
    const [urec,seturec] = useState(false);
    const [isrec,setisrec] = useState(false);
    const [iscur,setiscur] = useState(false);
    const [isconn,setisconn] = useState(false);
    const [reqstring,setreqstring] = useState('');
    const [total_post,settotal_post] = useState(0);
    const [total_conn,settotal_conn] = useState(0);

    useEffect(()=>{
        
            fetch('http://localhost:5001/Q36', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                user_name:user_name
                }),
            }).then((response) => response.json()).then((dat)=>{
                setcur_work(dat.cur_work);
                setdesc(dat.desc);
                setemail(dat.email);
                setisconn(dat.isconn);
                setiscur(dat.iscur);
                setisrec(dat.isrec);
                setplace(dat.place);
                setreqstring(dat.reqstring);
                settotal_conn(dat.total_conn);
                settotal_post(dat.total_post);
                seturec(dat.urec);
                setuser_photo(dat.user_photo);
                setIsLoading(false);
            })
            
          },[user_name]);


    useEffect(()=>{

    },[setisconn,setreqstring])
    
    const handleclick =()=>{
        console.log("buttonclicked");
        (async () => {
            const dat = await fetch('http://localhost:5001/Q37', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                user_name:user_name,
                reqstring:reqstring
            }),
            }).then((response) => response.json());
            
            setisconn(dat.isconn);
            setreqstring(dat.reqstring);
            
          })();
    }
    const handlereject =()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q37', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                user_name:user_name,
                reqstring:"Reject"
            }),
            }).then((response) => response.json());
            
            setisconn(dat.isconn);
            setreqstring(dat.reqstring);
            
          })();
    }
    const handlenavigate =()=>{
        navigate('/fill-profile',{replace:true});
    }


    return(
        <>  
        { isLoading &&
            <div>Loading.. please wait!</div>
            }
            { !isLoading && <div>
                    <div>
                        <Navbar/>
                    </div>
                    <div >
                        <div class=" profilepage ">
                        
                            <div class="cd">
                                <div class="fb"></div>
                                <div class="rounded-top text-white d-flex flex-row" >
                                    
                                    <div class=" imbdic " >
                                        <img class="profilepphoto" src={"http://localhost:5001/uploads/"+user_photo}
                                            alt="Gen" 
                                            />
                                    </div>
                                    
                                    {iscur && <button type="button" onClick={handlenavigate} class=" edit btn btn-outline-dark" data-mdb-ripple-color="dark">
                                            Edit profile
                                    </button>}
                                </div>
                            <div class="info" >
                                <div class="d-flex datafo text-center py-1">
                                    <div>
                                        <p class="mb-1 h5">{total_post}</p>
                                        <p class="small text-muted mb-0">Posts</p>
                                    </div>
                                    <div class="px-3">
                                        <p class="mb-1 h5">{total_conn}</p>
                                        <p class="small text-muted mb-0">Connections</p>
                                    </div>

                                </div>
                            </div>
                            <div class=" about card-body p-4 text-black">
                                <div class="mb-5">
                                <p class="lead fw-normal mb-1">About</p>
                                    <div class="p-4" >
                                        <p class="font-italic mb-1">{user_name}</p>
                                        <p class="font-italic mb-1">{email}</p>
                                        <p class="font-italic mb-0">{place}</p>
                                        <p class="font-italic mb-1">{desc}</p>
                                        <p class="font-italic mb-1">{cur_work}</p>
                                       {urec && <p class="font-italic mb-1">Recruiter</p>}
                                       {!urec && <p class="font-italic mb-1">Applicant</p>}
                                    </div>
                                    {!iscur && <div class="req">
                                        {!isconn && <button type="button" onClick={handleclick} class="btn btn-outline-dark" data-mdb-ripple-color="dark">
                                                    {reqstring}
                                            </button>}
                                          {!isconn && reqstring==="accept" && <button type="button" onClick={handlereject} class="btn btn-outline-dark" data-mdb-ripple-color="dark">
                                                    Reject
                                            </button>
                                          }  
                                         {isconn && <button type="button" class=" Displayed btn btn-outline-dark" data-mdb-ripple-color="dark">
                                                    Connected
                                            </button>}   
                                    </div>}
                                    {isrec && iscur && <div class="cjob">
                                <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">
                                           createjob
                                    </button>
                                    </div>}
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    }
        </>
    )
}    