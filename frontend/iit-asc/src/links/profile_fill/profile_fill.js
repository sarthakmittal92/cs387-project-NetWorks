import { React, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
export const FillProfile = () => {

    const [edu, setEdu] = useState([]);
    const navigate = useNavigate();
    const [image, setImage] = useState([]);
    // const handleRemove = (idx) => {
    //     const newList = edu;
    //     newList.splice(idx, 1);
    //     setEdu(newList);
    // }

    function handleAdd (){
        const newList = [...edu, { insti: "", start_time: "", end_time: "" }];
        setEdu(newList);
    }

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("profile_fill" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("profile_fill" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleSubmit = (event) => {
        console.log("profile_fill/handleSubmit: " + event.target);
        if (event.target) {
            showToastMessage(event.target, 1);
            const inputs = event.target;
            fetch('http://localhost:5001/Q18', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    place: inputs.loc.value,
                    desc: inputs.desc.value
                }),
            })
                .then((response) => response.json())
                .then((dat) => {
                    if (dat.value) {
                        showToastMessage(dat, 1);
                    }
                    else {
                        showToastMessage(dat, 0);
                    }
                })
                .catch((err) => {
                    console.log("profile_fill: " + err.message);
                });
        }
        else {
            showToastMessage(event.target, 0);
        }
    }

    function dateFormat(input) {
        const arr = input.split("-");
        var string = arr[2] + " ";
        if (arr[1] === "01") {
            string += "Jan ";
        }
        else if (arr[1] === "02") {
            string += "Feb ";
        }
        else if (arr[1] === "03") {
            string += "Mar ";
        }
        else if (arr[1] === "04") {
            string += "Apr ";
        }
        else if (arr[1] === "05") {
            string += "May ";
        }
        else if (arr[1] === "06") {
            string += "Jun ";
        }
        else if (arr[1] === "07") {
            string += "Jul ";
        }
        else if (arr[1] === "08") {
            string += "Aug ";
        }
        else if (arr[1] === "09") {
            string += "Sep ";
        }
        else if (arr[1] === "10") {
            string += "Oct ";
        }
        else if (arr[1] === "11") {
            string += "Nov ";
        }
        else if (arr[1] === "12") {
            string += "Dec ";
        }
        string += arr[0];
        return string;
    }

    const handleWork = (event) => {
        console.log("profile_fill/handleWork: " + event.target.pos.value);
        if (event.target) {
            showToastMessage(event.target, 1);
            const inputs = event.target;
            fetch('http://localhost:5001/Q26', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    position: inputs.pos.value,
                    company: inputs.comp.value,
                    start_time: dateFormat(inputs.st.value)
                }),
            })
                .then((response) => response.json())
                .then((dat) => {
                    if (dat.value) {
                        showToastMessage(dat, 1);
                    }
                    else {
                        showToastMessage(dat, 0);
                    }
                })
                .catch((err) => {
                    console.log("profile_fill: " + err.message);
                });
        }
        else {
            showToastMessage(event.target, 0);
        }
    }

    const addInsti = (idx, val) => {
        const newList = edu;
        newList[idx].insti = val;
        setEdu(newList);
    }

    const addStartTime = (idx, val) => {
        const newList = edu;
        newList[idx].start_time = dateFormat(val);
        setEdu(newList);
    }

    const addEndTime = (idx, val) => {
        const newList = edu;
        newList[idx].end_time = dateFormat(val);
        setEdu(newList);
    }

    const handleEdu = (event) => {
        console.log("profile_fill/handleEdu: " + event.target);
        if (edu) {
            fetch('http://localhost:5001/Q27', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    edu: edu
                }),
            })
                .then((response) => response.json())
                .then((dat) => {
                    if (dat.value) {
                        showToastMessage(dat, 1);
                    }
                    else {
                        showToastMessage(dat, 0);
                    }
                })
                .catch((err) => {
                    console.log("profile_fill: " + err.message);
                });
        }
        else {
            showToastMessage(edu, 0);
        }
    }
    const handlePhoto = (event)=>{
        event.preventDefault();
        (async () => {
            const formData = new FormData();
            formData.append("image",image);
            if(!(image.length===0 || image===undefined)){
                const dat = await fetch('http://localhost:5001/Q6', {
                        method: 'POST',
                        credentials:'include',
                        withCredentials:true,
                        body: formData,
                    }).then((response) => response.json());
                    if(dat.result==="Successful"){
                        showToastMessage(dat.result,1); 
                        navigate("/home");
                    }
                    else{
                        showToastMessage(dat.result,0); 
                    }
            }
        })();
    }

    return (
        <>
            <ToastContainer />
            <div class="fill-profile">

                <div class="containersa">
                    <h2 class="h2sa">Personal Details</h2>
                    <form class="center" onSubmit={handleSubmit}>
                        <ul class="responsive-table">
                            {/* <li class="table-header sa">
                                <div class="col col-2">Field</div>
                                <div class="col col-2">Input</div>
                            </li> */}
                            <li class="table-row sa">
                                <div class="col col-2">Location</div>
                                <div class="col col-2"><input id="loc" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Description</div>
                                <div class="col col-2"><input id="desc" type="text" /></div>
                            </li>
                        </ul>
                        <button class="button-7 center" type="submit">Submit Personal Details</button>
                    </form>
                </div>

                <div class="containersa">
                    <h2 class="h2sa">Upload Profile Photo</h2>
                    <form class="center" onSubmit={handlePhoto}>
                        <ul class="responsive-table">
                            <li class="table-row sa">
                                <div class="col col-2">Pick Photo</div>
                                <div class="col col-2"><input  onChange={(e)=>{setImage(e.target.files[0])}} type = "file" id = "image" name = "image" multiple = "true" /></div>
                            </li>
                        </ul>
                        <button class="button-7 center" type="submit">Submit Profile Photo</button>
                    </form>
                </div>

                <div class="containersa">
                    <h2 class="h2sa">Work Details</h2>
                    <form class="center" onSubmit={handleWork}>
                        <ul class="responsive-table">
                            {/* <li class="table-header sa">
                                <div class="col col-2">Field</div>
                                <div class="col col-2">Input</div>
                            </li> */}
                            <li class="table-row sa">
                                <div class="col col-2">Current Work</div>
                                <div class="col col-2"><input id="pos" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Company</div>
                                <div class="col col-2"><input id="comp" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Start Month</div>
                                <div class="col col-2"><input id="st" type="date" /></div>
                            </li>
                        </ul>
                        <button class="button-7 center" type="submit">Submit Work Details</button>
                    </form>
                </div>

                <div class="containersa">
                    <h2 class="h2sa">Education Details</h2>
                    <form class="center" onSubmit={handleEdu}>
                        {
                            edu.map((item, idx) => (
                                <ul key={idx} class="responsive-table">
                                    {/* <li class="table-header sa">
                                        <div class="col col-2">Field</div>
                                        <div class="col col-2">Input</div>
                                    </li> */}
                                    <li class="table-row sa">
                                        <div class="col col-2">Institute</div>
                                        <div class="col col-2"><input onChange={(e) => addInsti(idx,e.target.value)} id="insti" type="text" /></div>
                                    </li>
                                    <li class="table-row sa">
                                        <div class="col col-2">Start Month</div>
                                        <div class="col col-2"><input onChange={(e) => addStartTime(idx,e.target.value)} id="st" type="date" /></div>
                                    </li>
                                    <li class="table-row sa">
                                        <div class="col col-2">End Month</div>
                                        <div class="col col-2"><input onChange={(e) => addEndTime(idx,e.target.value)} id="et" type="date" /></div>
                                    </li>
                                </ul>
                            ))
                        }
                        <button class="button-7" onClick={(e) => { e.preventDefault(); handleAdd(); }}>Add education</button>
                        <br /><br />
                        <button class="button-7 center" type="submit">Submit Education Details</button>
                    </form>
                </div>
                
                <div class="containersa">
                    <br />
                    <button class="button-7 center" onClick={() => { navigate("/home", { replace: true }) }} >
                        Go to Home
                    </button>
                    <br /><br /><br /><br /><br />
                </div>

            </div>
        
        </>
    );
}
