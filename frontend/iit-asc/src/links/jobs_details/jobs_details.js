import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
export const JobDetails = () => {
    
    const params = useParams();
    const job_id = params.job_id;
    const [info, setInfo] = useState([]);
    const [appls, setAppls] = useState([]);
    const [isRec, setRec] = useState(false);
    const [uid, setID] = useState(-1);
    const [image, setImage] = useState([]);
    const [canApply, setCanApply] = useState(false);

    const navigate = useNavigate();

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("jobs_details" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("jobs_details" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    useEffect(() => {
        
    },[appls])
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

    const handleApply = (event) => {
        event.preventDefault();
        (async () => {
            const formData = new FormData();
            formData.append("image",image);
            formData.append("job_id",job_id);
            if(!(image.length===0 || image===undefined)){
                const dat = await fetch('http://localhost:5001/Q25', {
                        method: 'POST',
                        credentials:'include',
                        withCredentials:true,
                        body: formData,
                    }).then((response) => response.json());
                    if(dat.value){
                        showToastMessage(dat.result,1); 
                        navigate("/jobs");
                    }
                    else{
                        showToastMessage(dat.result,0); 
                    }
            }
        })();
    }

    // const handleAccept = (id) => {
    //     fetch('http://localhost:5001/Q35', {
    //         method: 'POST',
    //         headers: {
    //         'Content-type': 'application/json',
    //         },
    //         credentials:'include',
    //         withCredentials:true,
    //         body: JSON.stringify({
    //             user_id: id,
    //             job_id: job_id
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((dat) => {
    //             if (dat.value) {
    //                 showToastMessage(dat, 1);
    //             }
    //             else {
    //                 showToastMessage(dat, 0);
    //             }
    //         })
    //         .catch((err) => {
    //         console.log("jobs_details/useEffect: " + err.message);
    //         });
    // }

    // const handleRemove = (idx) => {
    //     const newList = [...appls];
    //     newList.splice(idx, 1);
    //     setAppls(newList);
    // }

    // const handleDownload = (path) => {

    // }

    const handleClose = () => {
        fetch('http://localhost:5001/Q35', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            credentials:'include',
            withCredentials:true,
            body: JSON.stringify({
                job_id: job_id
            }),
        })
            .then((response) => response.json())
            .then((dat) => {
                if (dat.value) {
                    showToastMessage(dat, 1);
                    navigate("/jobs",{replace:true});
                }
                else {
                    showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
            console.log("jobs_details/handleClose: " + err.message);
            });
    }

    useEffect(() => {
        console.log("datahight");
        fetch('http://localhost:5001/Q34', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            credentials:'include',
            withCredentials:true,
            body: JSON.stringify({}),
            })
            .then((response) => response.json())
            .then((dat) => {
                console.log(dat);
                if (dat.value) {
                    showToastMessage(dat.user_id, 1);
                    setRec(true);
                    setID(dat.user_id);
                    console.log(dat.user_id,"chhc");
                }
                else {
                    console.log(dat.user_id);
                    showToastMessage(dat, 0);
                    setRec(false);
                    setID(dat.user_id);
                };
            })
            .catch((err) => {
            console.log("jobs_details/useEffect: " + err.message);
            });
        fetch('http://localhost:5001/Q17', {
                        method: 'POST',
                        headers: {
                        'Content-type': 'application/json',
                        },
                        credentials:'include',
                        withCredentials:true,
                        body: JSON.stringify({
                            job_id: job_id
                        }),
                    })
                        .then((response) => response.json())
                        .then((dat) => {
                            if (dat.value) {
                                showToastMessage(dat, 1);
                                setInfo(dat.job);
                                console.log(dat.job[0].deadline);
                            }
                            else {
                                showToastMessage(dat, 0);
                            }
                        })
                        .catch((err) => {
                        console.log("jobs_details/useEffect: " + err.message);
                        });
        fetch('http://localhost:5001/Q40', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            credentials:'include',
            withCredentials:true,
            body: JSON.stringify({
                job_id: job_id
            }),
        })
            .then((response) => response.json())
            .then((dat) => {
                if (dat.value) {
                    showToastMessage(dat, 1);
                    setCanApply(false);
                }
                else {
                    showToastMessage(dat, 0);
                    setCanApply(true);
                }
            })
            .catch((err) => {
            console.log("jobs_details/handleCheck: " + err.message);
            });
        (async () => {
            console.log("here");
            const dat = await fetch('http://localhost:5001/Q33', {
              method: 'POST',   
              headers: {
                'Content-type': 'application/json',
              },
              credentials:'include',
              withCredentials:true,
                body: JSON.stringify({
                    job_id: job_id
                }),
            }).then((response) => response.json());
                if (dat.value) {
                    // showToastMessage(dat.users[0].username, 1);
                    console.log(dat.users);
                    setAppls(dat.users);
                }
                else {
                    showToastMessage(dat, 0);
                }
          })();
    }, [job_id, setCanApply, setAppls, setInfo, setRec, setID])

    function getDateTime (deadline) {
        const currentdate = new Date();
        const year = currentdate.getFullYear();
        const month = currentdate.getMonth() + 1;
        const date = currentdate.getDate();
        if (year < parseInt(deadline.split("-")[0])) {
            return true;
        }
        if (month < parseInt(deadline.split("-")[1])) {
            return true;
        }
        if (date <= parseInt(deadline.split("-")[2])) {
            return true;
        }
        return false;
    }

    return (
        <>
            <ToastContainer />
            <div class="job-details">
                {
                    info.map((item, idx) => (
                        <div key={idx}>
                            Job #{item.job_id}
                            <br />
                            Company: {item.company}
                            <br />
                            Job desc: {item.job_desc}
                            <br />
                            Deadline: {dateFormat(item.deadline.split("T")[0])}
                            <br />
                            {
                                isRec && uid === item.launched_by &&
                                <div>
                                        Applicants
                                        <div>
                                            {
                                                appls.map((item, idx) => (
                                                    <div key={idx}>
                                                        @{item.username}
                                                        <button>
                                                                <a
                                                                href={"http://localhost:5001/uploads/"+item.path}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                >
                                                                Resume
                                                            </a></button>
                                                        <br />
                                                        {/* <button onClick={handleAccept(item.user_id)}>Accept</button>
                                                        <br /> */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <br />
                                        {
                                            item.is_open &&
                                            <button onClick={handleClose}>Close</button>
                                        }
                                       
                                </div>
                            }
                            {
                                canApply && getDateTime(item.deadline) && uid !== item.launched_by && item.is_open &&
                                <div>
                                    <form onSubmit={handleApply}>
                                        <div class = "form-field">
                                        <input  onChange={(e)=>{setImage(e.target.files[0])}} type = "file" id = "image" name = "image" multiple = "true" />
                                        </div>
                                        <div class = "form-field">
                                        <button type="submit">Apply</button>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            
        </>
    );
}