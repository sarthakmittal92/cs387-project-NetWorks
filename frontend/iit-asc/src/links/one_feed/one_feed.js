import "./one_feed.css"
import React, { useState,useEffect } from "react";
import {Comment} from '../comment/comment'
import 'react-toastify/dist/ReactToastify.css';

export const OneFeed = (postid) => {

    /*{post_owner:user_name,post_owner_photo:'/image-...',post_time:10h,bool_post_photo:false,post_photo:'/...',post_caption:"",
    post_hashtags:"",like_count:45,comment_count:34,i_like:true}*/
    const [isLoading, setIsLoading] = useState(true);

    const [hpimg, sethpimg] = useState(false);
    const [isLike, setLike] = useState(false);
    const [powph,setpowph] = useState('image-blank_photo.jpg');
    const [powun,setpowun] = useState('');
    const [ptime,setptime] = useState('');
    const [pphoto,setpphoto] = useState('');
    const [pcapt,setpcapt] = useState('');
    const [phasht,setphasht] = useState('');
    const [likec,setlikec] = useState(0);
    const [commc,setcommc] = useState(0);

    const [chan,setchang] = useState(0);

    

    useEffect(()=>{
        console.log("reached_here");
        (async () => {
            const dat = await fetch('http://localhost:5001/Q20', {
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
            setLike(dat.i_like);
            setcommc(dat.comment_count);
            sethpimg(dat.bool_post_photo);
            if(dat.bool_post_photo){
                setpphoto(dat.post_photo);
            }
            setlikec(dat.like_count);
            setpcapt(dat.post_caption);
            setphasht(dat.post_hashtags);
            setpowph(dat.post_owner_photo);
            setpowun(dat.post_owner);
            setptime(dat.post_time);
            setIsLoading(false);
            var div = document.getElementById(''+postid.postid);
            div.style.display = "none";
          })();
        
    },[postid]);

    useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q20', {
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
            setcommc(dat.comment_count);
          })();
    },[postid,chan,setchang])

    useEffect(()=>{
        
    },[isLoading,postid]);

    const handleLike = () => {

        var x = !isLike;

        setLike(x);
        
        if(x){
            setlikec(''+(parseInt(likec, 10)+1));
        }else{
            setlikec(''+(parseInt(likec, 10)-1));
        }
        
        (async () => {
            const dat = await fetch('http://localhost:5001/Q30', {
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
            
            console.log(dat);
          })();

    }
    const toggleDiv = () => {
        var div = document.getElementById(''+postid.postid);
        div.style.display = div.style.display === "none" ? "block" : "none";
    }
    const hcchange = (e)=>{
        console.log("tasty");
        setchang(1);
    }

    return(<>

            { isLoading &&
            <div>Loading.. please wait!</div>
            }
            { !isLoading &&
            <div class="card" >
                <div class="card-body">
                    <div>
                        <div className="feedimgD">
                            <img className="feedimg" src={"http://localhost:5001/uploads/"+powph}  alt="Avatar" />
                        </div>
                        
                        <div className="feeduD">
                        <a href={"/profile/"+powun} class="text-dark ">
                            <strong  class="x">{powun}<br/></strong>
                        </a>
                            <small >{ptime}</small>
                        </div>
                    </div>
                
                    <div className="CaptionF">
                        <p className="caption" id="Caption">
                        {pcapt}
                        </p>
                        <br/>
                        <p className="htag" id="Hashtag">{phasht}</p>
                    </div>
                </div>
                
                {hpimg && <div className="postimgD" >
                    <img className="postimg"  src={"http://localhost:5001/uploads/"+pphoto} class="w-100" alt="/" />
                </div>}
                
                <div class="card-body">
                
                    <div class="d-flex justify-content-between mb-3">
                        <div>
                            <label class="heart"/>
                            <span class="numh">{likec}</span>
                        </div>
                        <div>
                            <label class="commentph"/>
                            <span class="numc">{commc}</span>
                        </div>
                    </div>
                    
                    <div class="xyz">
                        <div  onClick={handleLike} className="likebutton" >
                            {isLike && <button className="like1" />}
                            {!isLike && <button className="like2" />}
                        </div>
                        <button type="button" onClick={toggleDiv} class="btn btn-link btn-lg comment" data-mdb-ripple-color="dark">
                        Comment
                        </button>
                    </div>
                
                </div>
                <div class="card-body"  id={''+postid.postid}><Comment value = {hcchange} postid={postid.postid}/></div>
            </div>
            }
    </>
    )

}