import React, { useState,useEffect } from 'react'
import "./comment.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Comment = (postid) =>  {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [random,setrandom] = useState(0);
    const [un,setun] = useState('');
    const [photo,setphoto] = useState('');

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

    useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q28', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                post_id:postid.postid
            }),
            }).then((response) => response.json());
            setphoto(dat.profile_photo);
            setun(dat.user_name);
            
          })();
        
    },[postid]);

    useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q21', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                post_id:postid.postid
            }),
            }).then((response) => response.json());
            setList(dat.comments);
            setIsLoading(false);
            
          })();
        
    },[postid,random]);

    useEffect(()=>{
    },[isLoading]);

    const handleSubmit = ()=>{
        
        var c = document.getElementById("commentinput"+postid.postid).value;
        document.getElementById("commentinput"+postid.postid).value = "";

        (async () => {
            const dat = await fetch('http://localhost:5001/Q29', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                post_id:postid.postid,
                comment:c,
            }),
            }).then((response) => response.json());
                showToastMessage(dat.result,dat.value);
                setIsLoading(true);
                 setrandom(1);
          })();
    }
  return (
    <>  
     <ToastContainer />
        { isLoading &&
            <div>Loading.. please wait!</div>
            }
            { !isLoading &&
        <div>
            <div className="CommentO">
                <li className="cl">
                <div class="CC">
                    <div >
                        <div className="comimgD">
                            <img className="commimg" src={"http://localhost:5001/uploads/"+photo}  alt="Avatar" />
                        </div>
                        <div className="comuD1">
                        <a href="/" className='refa' >
                            <small className="cnm" >{un}</small>
                            </a>
                            <small className="ctim" ></small>
                        </div>
                        <button onClick={handleSubmit} className="bpost">comment</button>
                    </div>
                
                    <div className="cinf">
                        <p>
                        <input id={"commentinput"+postid.postid} type="text" className='cinp'/>
                        </p>
                    </div>
                </div>
                </li>
                 {list.length!==0 && <ul className="cl">
                    {list.map((item) => (
                        <li key={item.id}>
                            <div class="CC">
                                <div>
                                    <div className="comimgD">
                                        <img className="commimg" src={"http://localhost:5001/uploads/"+item.user_photo}  alt="Avatar" />
                                    </div>
                                    
                                    <div className="comuD">
                                    <a href="/" >
                                        <small className="cnm" >{item.user_name}</small>
                                    </a>
                                        <small className="ctim" >{item.time}</small>
                                    </div>
                                </div>
                            
                                <div className="cinf">
                                    <p>
                                    {item.user_comment}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
                {list.length===0 && <div>No comments yet !!!!</div>}
            </div>
        </div>
        }
    </>
  )
}
