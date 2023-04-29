import { React } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
export const NewJob = () => {
    const navigate = useNavigate();
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
        console.log("jobs_new/handleSubmit: " + event.target);
        if (event.target) {
            showToastMessage(event.target, 1);
            const inputs = event.target;
            fetch('http://localhost:5001/Q24', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    company: inputs.comp.value,
                    place_of_posting: inputs.pop.value,
                    deadline: dateFormat(inputs.dead.value),
                    full_part: inputs.full.value,
                    skill_level: inputs.skill.value,
                    company_desc: inputs.cdesc.value,
                    job_desc: inputs.jdesc.value
                }),
            })
                .then((response) => response.json())
                .then((dat) => {
                    if (dat.value) {
                        showToastMessage(dat, 1);
                        navigate('/jobs', { replace: true });
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

    function dateFormat(input) {
        const arr = input.split("-");
        var string = arr[2] + " ";
        if (arr[1] === "01") {
            string += "Jan ";
        }
        else if (arr[1] === "02") {
            string += "Feb ";
        }
        else if (arr[1] === "03") {
            string += "Mar ";
        }
        else if (arr[1] === "04") {
            string += "Apr ";
        }
        else if (arr[1] === "05") {
            string += "May ";
        }
        else if (arr[1] === "06") {
            string += "Jun ";
        }
        else if (arr[1] === "07") {
            string += "Jul ";
        }
        else if (arr[1] === "08") {
            string += "Aug ";
        }
        else if (arr[1] === "09") {
            string += "Sep ";
        }
        else if (arr[1] === "10") {
            string += "Oct ";
        }
        else if (arr[1] === "11") {
            string += "Nov ";
        }
        else if (arr[1] === "12") {
            string += "Dec ";
        }
        string += arr[0];
        return string;
    }

    return (
        <>
            <ToastContainer />
            <div class="new-job">
                Fill in job details

                <div>
                    Job Details
                    <form onSubmit={handleSubmit}>
                        <br />
                        <label>Company:</label>
                        <input id="comp" type="text" />
                        <br />
                        <label>Place of posting:</label>
                        <input id="pop" type="text" />
                        <br />
                        <label>Deadline:</label>
                        <input id="dead" type="date" />
                        <br />
                        <label>Full time?:</label>
                        <input id="full" type="radio" />
                        <br />
                        <label>Skill level:</label>
                        <input id="skill" type="text" />
                        <br />
                        <label>Company Desc:</label>
                        <input id="cdesc" type="text" />
                        <br />
                        <label>Job Desc:</label>
                        <input id="jdesc" type="text" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </>
    );
}
