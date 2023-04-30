import React, { useState,useEffect } from 'react'
import "./comment.css"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Comment = ({value,postid}) =>  {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [random,setrandom] = useState(0);
    const [un,setun] = useState('');
    const [photo,setphoto] = useState('');

    

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
                post_id:postid
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
                post_id:postid
            }),
            }).then((response) => response.json());
            setList(dat.comments);
            setIsLoading(false);
          })();
        
    },[postid]);

    useEffect(()=>{
    },[isLoading]);

    function myfunc(){
        value(1);
    }

    const handleSubmit = ()=>{
        
        var c = document.getElementById("commentinput"+postid).value;
        document.getElementById("commentinput"+postid).value = "";
        // var d = document.getElementById("cc"+postid).value;
        // document.getElementById("cc"+postid).value = ''+(parseInt(d, 10)+1);
        if(c!==""){console.log("from here");
        (async () => {
            await fetch('http://localhost:5001/Q29', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                post_id:postid,
                comment:c,
            }),
            }).then((response) => response.json());
                console.log("whyyyyyy");
                // showToastMessage(dat.result,dat.value);
                //setIsLoading(true);
                //  setrandom(1);
                 console.log(postid)
                 myfunc();
                 (async () => {
                    const dat = await fetch('http://localhost:5001/Q21', {
                      method: 'POST',   
                      headers: {
                        'Content-type': 'application/json',
                      },
                      credentials:'include',
                      withCredentials:true,
                      body: JSON.stringify({
                        post_id:postid
                    }),
                    }).then((response) => response.json());
                    setList(dat.comments);
                    setIsLoading(false);
                  })();
                //   console.log(value.commc);     
          })();}
          
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
                        <a href={"/profile/"+un} className='refa' >
                            <small className="cnm" >{un}</small>
                            </a>
                            <small className="ctim" ></small>
                        </div>
                        <button onClick={handleSubmit} className="bpost">comment</button>
                    </div>
                
                    <div className="cinf">
                        <p>
                        <input id={"commentinput"+postid} type="text" className='cinp'/>
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
                                    <a href={"/profile/"+item.user_name} >
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
