
import React from 'react';

export const Temp = () => {

    return (
        <>
            <div>
            <form
                action = "http://localhost:5001/Q6"
                enctype = "multipart/form-data"
                method = "post"
                class = "myform">
                <div class = "form-field">
                <label>Upload file here</label>
                <input type = "file" id = "image" name = "image" multiple = "true" />
                </div>
                <div class = "form-field">
                <input type = "submit" />
                </div>
            </form>
            </div>
        </>
    );
}