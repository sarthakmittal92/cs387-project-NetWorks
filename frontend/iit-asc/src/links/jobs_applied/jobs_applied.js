import "./jobs_applied.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer} from "react-toastify";

export const JobsApplied = () => {

    const [rows, setRows] = useState([]);

    // const showToastMessage = (data, val) => {
    //     if (val) {
    //         toast.success("jobs_applied" + data, {
    //             position: toast.POSITION.TOP_RIGHT
    //         });
    //     }
    //     else {
    //         toast.error("jobs_applied" + data, {
    //             position: toast.POSITION.TOP_RIGHT
    //         })
    //     }
    // }

    const handleRequest = (idx) => e => {
        const body = { job_id: rows[idx].job_id };
        console.log("jobs_applied/handleRequest: " + body);
        fetch('http://localhost:5001/Q15', {
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
                    // showToastMessage(dat, 1);
                }
                else {
                    // showToastMessage(dat, 0);
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
                    // showToastMessage(dat, 1);
                    setRows(dat.jobs);
                }
                else {
                    // showToastMessage(dat, 0);
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
                    <div class="containersa">
                        <h2 class="h2sa">Jobs Applied</h2>
                        <ul class="responsive-table">
                            <li class="table-header sa">
                                <div class="col col-2">Job</div>
                                <div class="col col-2">Application</div>
                            </li>
                            {
                                rows.map((item, idx) => (
                                    <li key={idx} class="table-row sa">
                                        <div class="col col-2" data-label="Customer Name"><a class="a" href={"/jobs/details/" + item.job_id}>Job ID: {item.job_id} Company: {item.company} Location: {item.place_of_posting}</a></div>
                                        <div class="col col-2" data-label="Customer Name">
                                            {
                                            item.is_open &&
                                            <button class="button-7" onClick={handleRequest(idx)}>
                                                Cancel
                                            </button>
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}