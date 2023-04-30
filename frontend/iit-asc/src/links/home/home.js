import "./home.css"
import React, {useState,useEffect } from "react";
import { Navbar} from '../navbar/navbar'
import { Makepost} from '../makepost/makepost'
import { OneFeed} from '../one_feed/one_feed'
import { Smallprofile} from '../smallprofile/smallprofile'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const Home = () => {
    
    const [numfeed,setnumfeed] = useState(5);
    const [plist,setplist] = useState([]);
    const [user_name,setuser_name] = useState('');
    const [end,setend] = useState(false);
    const [items, setItems] = useState([]);
    

    useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q38', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({}),
            }).then((response) => response.json());
                    var temp = [];
                    dat.hashtags.map((val, key) => (
                        temp[key] = {
                            id: key,
                            name: val.hashtag
                        }
                    ))
                    setItems(temp);
          })();
    },[])

    const handleOnSearch = (string, results) => {
        
        if(string===""){
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
            setend(dat.end)
            
          })();}
    }

    const handleOnHover = (result) => {
        console.log("search_jobs/handleOnHover: " + result);
    }

    const handleOnSelect = (item) => {
        console.log("search_jobs/handleOnSelect" + item.name);
        if (item) {
            (async () => {
                const dat = await fetch('http://localhost:5001/Q39', {
                  method: 'POST',   
                  headers: {
                    'Content-type': 'application/json',
                  },
                  credentials:'include',
                  withCredentials:true,
                  body: JSON.stringify({hashtag:item.name}),
                }).then((response) => response.json());
                console.log(dat.post_ids);
                setplist(dat.post_ids);
                setend(true)
              })();
        }
        else {
            //showToastMessage(item, 0);
            console.log("error");
        }
    }

    const handleOnFocus = () => {
        console.log("search_jobs/handleOnFocus");
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }
    

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
            setend(dat.end)
            
          })();
        
    },[numfeed]);

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

    // const handleload =()=>{
    //     setnumfeed(numfeed+5);
    // }
    const handleScroll = (e) => {
        
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight+3;
        // console.log(e.target.clientHeight,e.target.scrollHeight - e.target.scrollTop,e.target.scrollHeight, e.target.scrollTop);
        
        if (bottom) { 
            if(!end){
                setnumfeed(numfeed+5);
            }
            console.log('Reached bottom')
        }
        
      }

    return(
        <>
            <div class="home">
                <div class = "toolbar">
                    <Navbar/> 
                </div>
                <div class = "profile">
                    <Smallprofile user_name={user_name}/>
                </div>
                <div class = "feed">
                    <div class = "mposts">
                        <Makepost/>
                    </div>
                    <div  onScroll={(e)=>{handleScroll(e)}} class = "fposts">
                            {plist.length!==0 && <ul className="cl">
                                    {plist.map((item) => (
                                        <li key={item.post_id}>
                                            <OneFeed postid={item.post_id}/>
                                        </li>
                                    ))}
                                </ul>}
                              {plist.length===0 && <div>No post yet</div>}  
                    </div>
                </div>
                <div class = "event">
                        <div class="hash-search">
                        <div>Search hashtags here</div>
                        <ReactSearchAutocomplete
                            items={items}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}    