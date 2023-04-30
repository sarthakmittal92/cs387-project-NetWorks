import React from "react";
import { NavLink } from 'react-router-dom'
import './Landing.css'
export const Landing = () => {

    var i = 0;
    var txt = 'Lorem ipsum dummy text blabla.';
    var speed = 50;

    function TypeWriter() {
        if (i < txt.length) {
            document.getElementById("fill-here").innerHTML += txt.charAt(i);
            i++;
            setTimeout(TypeWriter, speed);
        }
    }

    // useEffect(() => {
    //     TypeWriter();
    // })

    return (

        <>
            <div class="landing">
                <div class="logo">
                    <div class="back3">
                    </div>
                    <div class="back3">
                    </div>
                    <div class="back3">
                    </div>
                    <div class="back3">
                    </div>
                    <div class="back3">
                    </div>
                    <div class="pphoto1">
                        {/* <img class="profilepphotos" src={"http://localhost:5001/uploads/"+user_photo}
                                                alt="Gen" 
                            /> */}
                        </div>      
                    <div class="back3">
                    </div>   
                    <div class="desc2">
                        <p>
                            NetWorks
                        </p>
                        <p>
                        <NavLink to="/login" className="btn2 btn-primary">
                        Login
                        </NavLink>
                        </p>
                    </div>
                    <div class="back3">
                    </div>  
                </div>  
                <div class="detail">
                    <button onClick={TypeWriter}>Give Details</button>
                    <p id="fill-here"></p>
                </div>
                <div class="intros">
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            {/* <img class="profilepphotos" src={"http://localhost:5001/uploads/"+user_photo}
                                                    alt="Gen" 
                                /> */}
                        </div>            
                        <div class="desc2">
                            <p class="font-italic mb-1">Pandurang Deore</p>
                            <p class="font-italic mb-1">Hmmmmmmmm something to write
                                <br /> How much can we write?
                            <br /> This much? I would think so.</p>
                        </div>
                    </div>
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            {/* <img class="profilepphotos" src={"http://localhost:5001/uploads/"+user_photo}
                                                    alt="Gen" 
                                /> */}
                        </div>            
                        <div class="desc2">
                            <p class="font-italic mb-1">Sarthak Mittal</p>
                            <p class="font-italic mb-1">Hmmmmmmmm something to write
                                <br /> How much can we write?
                            <br /> This much? I would think so.</p>
                            {/* <p class="font-italic mb-1">sarthakmittal0902@gmail.com</p> */}
                        </div>
                    </div>
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            {/* <img class="profilepphotos" src={"http://localhost:5001/uploads/"+user_photo}
                                                    alt="Gen" 
                                /> */}
                        </div>            
                        <div class="desc2">
                            <p class="font-italic mb-1">Shikhar Agrawal</p>
                            <p class="font-italic mb-1">Hmmmmmmmm something to write
                                <br /> How much can we write?
                            <br /> This much? I would think so.</p>
                            {/* <p class="font-italic mb-1">sarthakmittal0902@gmail.com</p> */}
                        </div>
                    </div>
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            {/* <img class="profilepphotos" src={"http://localhost:5001/uploads/"+user_photo}
                                                    alt="Gen" 
                                /> */}
                        </div>            
                        <div class="desc2">
                            <p class="font-italic mb-1">Mayank Jain</p>
                            <p class="font-italic mb-1">Hmmmmmmmm something to write
                                <br /> How much can we write?
                            <br /> This much? I would think so.</p>
                            {/* <p class="font-italic mb-1">sarthakmittal0902@gmail.com</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
};
