import "./connections.css"
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

export const Connections = () => {

    const [rows, setRows] = useState([]);
    // const navigate = useNavigate();

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("connections" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("connections" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    // const handleChat = (idx) => {
    //     console.log("connections/handleChat" + idx);
    //     if (idx) {
    //         showToastMessage(idx, 1);
    //         navigate('/chat/' + rows[idx].username, {
    //             replace: true
    //         });
    //     }
    //     else {
    //         showToastMessage(idx, 0);
    //     }
    // }

    useEffect(() => {
        fetch('http://localhost:5001/Q13', {
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
            console.log("connections/useEffect: " + err.message);
            });
    }, [setRows]);

    return (
        <>
            <ToastContainer />
            <div class="connections">
                <div class="caption">
                    <div class="containersa">
                        <h2 class="h2sa">Connections</h2>
                        <ul class="responsive-table">
                            <li class="table-header sa">
                            <div class="col col-2">Username</div>
                            </li>
                            {
                                rows.map((item, idx) => (
                                    <li key={idx} class="table-row sa">
                                        <div class="col col-2" data-label="Customer Name"><a class="a"href={"/profile/" + item.username}>{item.username}</a></div>
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