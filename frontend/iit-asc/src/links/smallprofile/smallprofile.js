import "./smallprofile.css"
import React from "react"
import { useState,useEffect } from "react";


export const Smallprofile = ({user_name}) => {
    /*
    {user_name:"",user_photo:"",email:,place:,desc:,cur_work:,isrec:,iscur:,reqstring:,total_post:,total_conn:}
     */
    
    const [user_photo,setuser_photo] = useState('');
    const [email,setemail] = useState('');
    const [place,setplace] = useState('');
    const [cur_work,setcur_work] = useState('');
    const [urec,seturec] = useState(false);
    const [total_post,settotal_post] = useState(0);
    const [total_conn,settotal_conn] = useState(0);

    useEffect(()=>{
        (async () => {
            const dat = await fetch('http://localhost:5001/Q36', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
              body: JSON.stringify({
                user_name:user_name
            }),
            }).then((response) => response.json());
            setcur_work(dat.cur_work);
            setemail(dat.email);
            setplace(dat.place);
            settotal_conn(dat.total_conn);
            settotal_post(dat.total_post);
            seturec(dat.urec);
            setuser_photo(dat.user_photo);
          })();
    })

        return(
            <>
                <div class = "profilef">
                    <div class="back">
                    </div>
                    <div class="pphoto">
                        <img class="profilepphotos" src={"http://localhost:5001/uploads/"+user_photo}
                                                alt="Gen" 
                            />
                    </div>
                    <div class="pc">
                            <div class="pc1">
                                <p class="mb-1 pn h5">{total_post}</p>
                                <p class="small pn text-muted mb-0">Posts</p>
                            </div>
                            <div class=" pc2 px-3">
                                <p class="mb-1 pn h5">{total_conn}</p>
                                <p class="small pn text-muted mb-0">Connections</p>
                            </div>
                      </div>              
                    <div class="desc">
                        <p class="font-italic mb-1">{user_name}</p>
                        <p class="font-italic mb-1">{email}</p>
                        <p class="font-italic mb-0">{place}</p>
                        <p class="font-italic mb-1">{cur_work}</p>
                        {urec && <p class="font-italic mb-1">Recruiter</p>}
                        {!urec && <p class="font-italic mb-1">Applicant</p>}
                    </div>
                </div>
            </>
        )
}