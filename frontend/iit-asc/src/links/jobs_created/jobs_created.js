import "./jobs_created.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

export const JobsCreated = () => {

    const [rows, setRows] = useState([]);
    const [isRec, setRec] = useState(false);
    const [uid, setID] = useState(-1);

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("jobs_created" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("jobs_created" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleRequest = (idx) => e => {
        const body = { job_id: rows[idx].job_id };
        console.log("jobs_created/handleRequest: " + body);
        fetch('http://localhost:5001/Q31', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body:JSON.stringify(body),
            credentials:'include',
            withCredentials:true,
        })
            .then((response) => response.json())
            .then((dat) => {
                if (dat.value) {
                    const trows = [...rows];
                    trows.splice(idx, 1);
                    setRows(trows);
                    showToastMessage(dat, 1);
                }
                else {
                    showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
                console.log("jobs_applied/handleRequest: " + err.message);
            })
    }

    useEffect(() => {
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
                if (dat.value) {
                    showToastMessage(dat, 1);
                    setRec(true);
                    setID(dat.user_id);
                }
                else {
                    showToastMessage(dat, 0);
                    setRec(false);
                    setID(dat.user_id);
                }
            })
            .catch((err) => {
            console.log("jobs_details/useEffect: " + err.message);
            });
        fetch('http://localhost:5001/Q32', {
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
                if (dat.value) {
                    showToastMessage(dat, 1);
                    setRows(dat.jobs);
                }
                else {
                    showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
            console.log("jobs_created/useEffect: " + err.message);
            });
    }, [setRows]);

    return (
        <>
            <ToastContainer />
            <div class="jobs-created">
                <div class="caption">
                    {
                        isRec &&
                        <div>
                                <div class="containersa">
                                    <h2 class="h2sa">Jobs Created</h2>
                                    <ul class="responsive-table">
                                        <li class="table-header sa">
                                            <div class="col col-2">Job</div>
                                            <div class="col col-2">Application</div>
                                        </li>
                                        {
                                            rows.map((item, idx) => (
                                                <div key={idx} class="table-row sa">
                                                    {
                                                        isRec && uid === item.launched_by && item.is_open &&
                                                        <li class="table-row sa">
                                                                <div class="col col-2" data-label="Customer Name"><a class="a" href={"/jobs/details/" + item.job_id}>Job ID: {item.job_id} Company: {item.company} Location: {item.place_of_posting}</a></div>
                                                            <div class="col col-2" data-label="Customer Name">
                                                                <button class="button-7" onClick={handleRequest(idx)}>
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </li>        
                                                    }
                                                </div>
                                            ))
                                        }
                                    </ul>
                                </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}