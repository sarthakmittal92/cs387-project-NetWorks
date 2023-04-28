import { React } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const FillProfile = () => {

    const showToastMessage = (data, val) => {
        if (val) {
            toast.success("profile_fill" + data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error("profile_fill" + data, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleSubmit = (event) => {
        console.log("profile_fill/handleSubmit: " + event.target.pic.value);
        if (event.target) {
            showToastMessage(event.target, 1);
            const inputs = event.target;
            fetch('http://localhost:5001/Q18', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    photo: inputs.pic.value,
                    place: inputs.loc.value,
                    desc: inputs.desc.value
                }),
            })
                .then((response) => response.json())
                .then((dat) => {
                    if (dat.value) {
                        showToastMessage(dat, 1);
                    }
                    else {
                        showToastMessage(dat, 0);
                    }
                })
                .catch((err) => {
                    console.log("profile_fill: " + err.message);
                });
        }
        else {
            showToastMessage(event.target, 0);
        }
    }

    return (
        <>
            <ToastContainer />
            <div class="fill-profile">
                Fill in profile details

                <div>
                    Personal Details
                    <form onSubmit={handleSubmit}>
                        <label>Profile picture:</label>
                        <input id="pic" type="file" alt="profile-photo" />
                        <br />
                        <label>Location:</label>
                        <input id="loc" type="text" />
                        <br />
                        <label>Description:</label>
                        <input id="desc" type="text" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div>
                    Education Details
                    {/* need to add dynamic list for this */}
                </div>

            </div>
        </>
    );
}
