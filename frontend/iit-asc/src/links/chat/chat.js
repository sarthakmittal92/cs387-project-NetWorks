import React from 'react'
import { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine'
import { Navbar} from '../navbar/navbar'
import "./chat.css"

export function Chat() {
  const [un, setun] = useState([]);
  const [us, setus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer =  setTimeout(() => {
      (async () => {
        const dat = await fetch('http://localhost:5001/Q8', {
          method: 'POST',   
          headers: {
            'Content-type': 'application/json',
          },
          credentials:'include',
          withCredentials:true,
        }).then((response) => response.json());
        console.log(dat.userName,dat.userSecret)
        setun(dat.userName);
        setus(dat.userSecret);
        setIsLoading(false)
      })();
        
    },1000);
    return()=>clearTimeout(timer)
  }, []);

  useEffect(()=>{

  },[isLoading,setun])
  
 
    return (
      <>
          { isLoading &&
            <div>Loading.. please wait!</div>
          }
          { !isLoading &&
            <>
                <div>
                <Navbar/>
              </div>
                    <div className = "chateng">
                      <ChatEngine
                        publicKey={'c6ede2ee-db27-4144-bc0f-214251a7b29a'}
                        userName={un}
                        userSecret={us}
                      />
                    </div>
            </>
          }
      </>
    )
  
    
}