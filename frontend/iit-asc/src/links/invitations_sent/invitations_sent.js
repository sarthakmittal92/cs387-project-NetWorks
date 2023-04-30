import "./invitations_sent.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

export const InvitationsSent = () => {

    const [rows, setRows] = useState([]);

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("invitations_sent" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("invitations_sent" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleRequest = (idx) => e => {
        const body = { receiver: rows[idx].user_id };
        console.log("invitations_sent/handleRequest: " + body);
        fetch('http://localhost:5001/Q11', {
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
                console.log("invitations_sent/handleRequest: " + err.message);
            })
    }

    useEffect(() => {
        fetch('http://localhost:5001/Q12', {
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
                    setRows(dat.users);
                }
                else {
                    showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
            console.log("invitations_sent/useEffect: " + err.message);
            });
    }, [setRows]);

    return (
        <>
            <ToastContainer />
            <div class="invitations-sent">
                <div class="caption">
                    <div class="containersa">
                        <h2 class="h2sa">Invitations Sent</h2>
                        <ul class="responsive-table">
                            <li class="table-header sa">
                                <div class="col col-2">Username</div>
                                <div class="col col-2">Request</div>
                            </li>
                            {
                                rows.map((item, idx) => (
                                    <li key={idx} class="table-row sa">
                                        <div class="col col-2" data-label="Customer Name"><a href={"/profile/" + item.username}>{item.username}</a></div>
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