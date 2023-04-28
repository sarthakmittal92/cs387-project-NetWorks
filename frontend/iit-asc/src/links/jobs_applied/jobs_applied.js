import "./jobs_applied.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

export const JobsApplied = () => {

    const [rows, setRows] = useState([]);

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("jobs_applied" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("jobs_applied" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleRequest = (idx) => e => {
        const body = { job: rows[idx] };
        console.log("jobs_applied/handleRequest: " + body);
        fetch('https://localhost:5001/Q15', {
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
        fetch('http://localhost:5001/Q16', {
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
            console.log("jobs_applied/useEffect: " + err.message);
            });
    }, [setRows]);

    return (
        <>
            <ToastContainer />
            <div class="jobs-applied">
                <div class="caption">
                    Jobs Applied
                    <table class="jobs-applied">
                        <thead>
                            <tr>
                                <th>
                                    Job
                                </th>
                                <th>
                                    Application
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            Job #{item.job_id}
                                        </td>
                                        <td>
                                            <button class="cancel" onClick={handleRequest(idx)}>
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}