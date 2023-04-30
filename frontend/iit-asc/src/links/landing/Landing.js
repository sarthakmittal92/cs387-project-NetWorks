import React from "react";
import { NavLink } from 'react-router-dom'
import './Landing.css'
export const Landing = () => {

    var i = 0;
    var txt = 'NetWorks is a platform for anyone looking to advance their career. We cater to various professionals including small business owners, job seekers and even students. Members can use NetWorks to tap into a network of professionals, companies, and groups otherwise beyond their reach. Click on the login button to join the growing community now!';
    var speed = 40;
    const msg = new SpeechSynthesisUtterance()

    const speechHandler = (msg) => {
        TypeWriter();
        msg.text = txt
        window.speechSynthesis.speak(msg)
    }

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
                    <div className="pphoto5">
                    <img class="profilepphotos5" src={"http://localhost:5001/uploads/1.GIF"}
                                                    alt="Gen"/>  
                            </div>   
                    <div class="back3">
                    </div>   
                    <div class="desc2">
                        <p class="desp">
                            MEGA NetWorks
                        </p>
                        <p>
                        <NavLink to="/login" className="lo btn2 btn-primary">
                        Login
                        </NavLink>
                        <button className="btn2 btn-primary" onClick={() => speechHandler(msg)}>Give Details</button>
                        </p>
                    </div>
                    <div class="back3">
                    </div>  
                </div>  
                <div class="detail">
                   
                    <p class="details" id="fill-here"></p>
                   
                </div>
                <div class="intros">
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2"><img class="profilepphotos1" src={"http://localhost:5001/uploads/pandu.JPG"}
                                                    alt="Gen"/>
                            
                        </div>            
                        <div class="desc3">
                            <p class="font-italic mb-1">Pandurang Deore</p>
                            <p class="font-italic mb-1">
                            Reach out to me at <br/>
                                200050096@iitb.ac.in
                            </p>
                        </div>
                    </div>
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            <img class="profilepphotos1" src={"http://localhost:5001/uploads/mit.JPG"}
                                                    alt="Gen" 
                                />
                        </div>            
                        <div class="desc3">
                            <p class="font-italic mb-1">Sarthak Mittal</p>
                            <p class="font-italic mb-1">
                                Reach out to me at <br/>
                                200050129@iitb.ac.in</p>
                            {/* <p class="font-italic mb-1">sarthakmittal0902@gmail.com</p> */}
                        </div>
                    </div>
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            <img class="profilepphotos1" src={"http://localhost:5001/uploads/shik.JPG"}
                                                    alt="Gen" 
                                />
                        </div>            
                        <div class="desc3">
                            <p class="font-italic mb-1">Shikhar Agrawal</p>
                            <p class="font-italic mb-1">
                            Reach out to me at <br/>
                                200070076@iitb.ac.in</p>
                            {/* <p class="font-italic mb-1">sarthakmittal0902@gmail.com</p> */}
                        </div>
                    </div>
                    <div class="profilef3">
                        <div class="back2">
                        </div>
                        <div class="pphoto2">
                            <img class="profilepphotos1" src={"http://localhost:5001/uploads/may.JPG"}
                                                    alt="Gen" 
                                />
                        </div>            
                        <div class="desc3">
                            <p class="font-italic mb-1">Mayank Jain</p>
                            <p class="font-italic mb-1">
                                Reach out to me at <br/>
                                20D070050@iitb.ac.in
                            </p>
                            {/* <p class="font-italic mb-1">sarthakmittal0902@gmail.com</p> */}
                        </div>
                    </div>
                    <div class="mp" ><p class=" mp mp1 font-italic mb-1">Made with ❤️ by The Boyzss!! </p><p>ⒸThe Boys. All Right Reserved 2023.</p></div>
                </div>
            
            </div>
        </>
  )
};
