import "./home.css"
import React, { useState,useEffect } from "react";
import { Navbar} from '../navbar/navbar'
import { Makepost} from '../makepost/makepost'
import { OneFeed} from '../one_feed/one_feed'
export const Home = () => {
    
    const [numfeed,setnumfeed] = useState(5);
    const [plist,setplist] = useState([]);

    useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q19', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                num_post:numfeed
            }),
            }).then((response) => response.json());
            setplist(dat.post_ids);
            console.log(dat,"Q19");
            if(dat.end){
                var div = document.getElementById("Load");
                div.style.display =  "none";
            }else{
                var div = document.getElementById("Load");
                div.style.display =  "block";
            }
            
          })();
        
    },[numfeed]);
    const handleload =()=>{
        setnumfeed(numfeed+5);
    }

    return(
        <>
            <div class="home">
                <div class = "toolbar">
                    <Navbar/> 
                </div>
                <div class = "profile">
                    <div class="pphoto">
                    </div>
                    <div class="desc">
                        profoverview<br/>
                        dytufy
                        profoverview<br/>
                        profoverview<br/>
                        profoverview<br/>
                        profoverview<br/>
                        profoverview<br/>
                    </div>
                
                </div>
                <div class = "feed">
                    <div class = "mposts">
                        <Makepost/>
                    </div>
                    <div class = "fposts">
                            {plist.length!==0 && <ul className="cl">
                                    {plist.map((item) => (
                                        <li key={item.post_id}>
                                            <OneFeed postid={item.post_id}/>
                                        </li>
                                    ))}
                                </ul>}
                              {plist.length===0 && <div>No post yet</div>}  
                    </div>
                    <button id="Load" onClick={handleload}>Load More...</button>
                </div>
                <div class = "event">
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>event<br/>event<br/>event<br/>

                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>event<br/>event<br/>event<br/>

                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>
                    event<br/>event<br/>

                </div>
            </div>
        </>
    )
}    