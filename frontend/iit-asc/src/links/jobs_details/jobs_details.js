import { React, useState, useEffect, useParams } from 'react';
import { ToastContainer, toast } from "react-toastify";

export const JobDetails = () => {

    const params = useParams();
    const job_id = params.job_id;
    const [info, setInfo] = useState([]);

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
                }
                else {
                    showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
            console.log("jobs_applied/useEffect: " + err.message);
            });
    }, [job_id, setInfo])

    return (
        <>
            <ToastContainer />
            <div class="job-details">
                {
                    info.map((item, idx) => (
                        <div>
                            Job #{item.job_id}
                            <br />
                            Company: {item.company}
                            <br />
                            Job desc: {item.job_desc}
                        </div>
                    ))
                }
            </div>
        </>
    );
}