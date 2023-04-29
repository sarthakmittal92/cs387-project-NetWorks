
import React from 'react';
import { useNavigate} from "react-router-dom";

export const Temp = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <div>
            <form
                action = ""
                enctype = "multipart/form-data"
                method = "post"
                class = "myform">
                <div class = "form-field">
                <input type = "file" id = "image" name = "image" multiple = "true" />
                </div>
                <div class = "form-field">
                <input onClick={navigate('/home', {replace: true})} type = "submit" />
                </div>
            </form>
            <div>
                <img src='http://localhost:5001/uploads/image-1682631046353.JPG' alt="Uploaded"/>
            </div>
            </div>
        </>
    );
}