import "./invitations_received.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer} from "react-toastify";

export const InvitationsReceived = () => {

    const [rows, setRows] = useState([]);

    // const showToastMessage = (data, val) => {
    //     if (val) {
    //         toast.success("invitations_received" + data, {
    //             position: toast.POSITION.TOP_RIGHT
    //         });
    //     }
    //     else {
    //         toast.error("invitations_received" + data, {
    //             position: toast.POSITION.TOP_RIGHT
    //         })
    //     }
    // }

    const handleRequest = (idx, acc) => e => {
        const body = { sender: rows[idx].user_id, accept: acc };
        console.log("invitations_received/handleRequest: " + body.sender);
        fetch('http://localhost:5001/Q4', {
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
                console.log("invitations_received/handleRequest: " + err.message);
            })
    }

    useEffect(() => {
        fetch('http://localhost:5001/Q10', {
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
                    setRows(dat.users);
                }
                else {
                    // showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
            console.log("invitations_received/useEffect: " + err.message);
            });
    }, [setRows]);

    return (
        <>
            <ToastContainer />
            <div class="invitations-received">
                <div class="caption">
                    <div class="containersa">
                        <h2 class="h2sa">Invitations Received</h2>
                        <ul class="responsive-table">
                            <li class="table-header sa">
                                <div class="col col-2">Username</div>
                                <div class="col col-2">Request</div>
                            </li>
                            {
                                rows.map((item, idx) => (
                                    <li key={idx} class="table-row sa">
                                        <div class="col col-2" data-label="Customer Name"><a class="a" href={"/profile/" + item.username}>{item.username}</a></div>
                                        <div class="col col-2" data-label="Customer Name">
                                            <button class="button-7" onClick={handleRequest(idx, 1)}>
                                                Accept
                                            </button>
                                        </div>
                                        <div class="col col-2" data-label="Customer Name">
                                            <button class="button-7" onClick={handleRequest(idx)}>
                                                Cancel
                                            </button>
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