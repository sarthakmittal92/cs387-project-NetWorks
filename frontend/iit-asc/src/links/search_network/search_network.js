import "./search_network.css"
import { React, useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SearchNetwork = () => {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("search_network/redirect" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("search_network/redirect" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    useEffect(() => {
        // var temp = [];
        // temp[0] = {
        //     id: "user1",
        //     name: "Sarthak",
        //     username: "sarthak"
        // };
        // setItems(temp);
        // setItems([{ user1: { id: "user1", name: "Sarthak" } }]);
        fetch('http://localhost:5001/Q3', {
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
                    var temp = [];
                    dat.users.map((val, key) => (
                        temp[key] = {
                            id: val.username,
                            name: val.username
                        }
                    ))
                    setItems(temp);
                }
                else {
                    showToastMessage(dat, 0);
                }
            })
            .catch((err) => {
            console.log("search_network: " + err.message);
            });
    }, [setItems])

    const handleOnSearch = (string, results) => {
        console.log("search_network/handleOnSearch: " + string + "\n" + results);
    }

    const handleOnHover = (result) => {
        console.log("search_network/handleOnHover: " + result);
    }

    const handleOnSelect = (item) => {
        console.log("search_network/handleOnSelect" + item);
        if (item) {
            showToastMessage(item, 1);
            navigate('/profile/' + item.username, {
                replace: true
            });
        }
        else {
            showToastMessage(item, 0);
        }
    }

    const handleOnFocus = () => {
        console.log("search_network/handleOnFocus");
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.username}</span>
            </>
        )
    }

    return (
        <>
            <ToastContainer />
            <div class="network-search">
                <div>Search users here</div>
                <ReactSearchAutocomplete
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />
            </div>
        </>
    );
}