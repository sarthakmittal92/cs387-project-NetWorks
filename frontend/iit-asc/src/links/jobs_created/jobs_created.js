import "./jobs_created.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

export const JobsCreated = () => {

    const [rows, setRows] = useState([]);
    const [isRec, setRec] = useState(true);
    const [uid, setID] = useState(0);

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
                            Jobs Created
                            <table class="jobs-created">
                                <thead>
                                    <tr>
                                        <th>
                                            Job
                                        </th>
                                        <th>
                                            Posting
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rows.map((item, idx) => (
                                            <tr key={idx}>
                                                {
                                                    isRec && uid === item.launched_by && item.is_open &&
                                                    <div>
                                                        <td>
                                                            Job :{item.company+" "+item.place_of_posting}
                                                        </td>
                                                        <td>
                                                            <button class="cancel" onClick={handleRequest(idx)}>
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </div>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}