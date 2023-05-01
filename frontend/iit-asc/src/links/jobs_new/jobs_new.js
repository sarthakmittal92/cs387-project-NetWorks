import './jobs_new.css'
import { React } from 'react';
import { ToastContainer} from 'react-toastify';
import { useNavigate} from "react-router-dom";
export const NewJob = () => {
    const navigate = useNavigate();
    // const showToastMessage = (data, val) => {
    //     if (val) {
    //         toast.success("jobs_new" + data, {
    //             position: toast.POSITION.TOP_RIGHT
    //         });
    //     }
    //     else {
    //         toast.error("jobs_new" + data, {
    //             position: toast.POSITION.TOP_RIGHT
    //         })
    //     }
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("jobs_new/handleSubmit: " + event.target);
        if (event.target) {
            // showToastMessage(event.target, 1);
            const inputs = event.target;
            var x = 1;
            if (inputs.full.checked) {
                x = 1;
            }
            else if (inputs.part.checked) {
                x = 0;
            }
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
                    full_part: x,
                    skill_level: inputs.skill.value,
                    company_desc: inputs.cdesc.value,
                    job_desc: inputs.jdesc.value
                }),
            })
                .then((response) => response.json())
                .then((dat) => {
                    if (dat.value) {
                        // showToastMessage(dat, 1);
                        navigate('/jobs', { replace: true });
                    }
                    else {
                        // showToastMessage(dat, 0);
                    }
                })
                .catch((err) => {
                    console.log("jobs_new: " + err.message);
                });
        }
        else {
            // showToastMessage(event.target, 0);
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
                <div class="containersa">
                    <h2 class="h2sa">Job Details</h2>
                    <form class="center" onSubmit={handleSubmit}>
                        <ul class="responsive-table">
                            {/* <li class="table-header sa">
                                <div class="col col-2">Field</div>
                                <div class="col col-2">Input</div>
                            </li> */}
                            <li class="table-row sa">
                                <div class="col col-2">Company</div>
                                <div class="col col-2"><input id="comp" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Place of Posting</div>
                                <div class="col col-2"><input id="pop" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Deadline</div>
                                <div class="col col-2"><input id="dead" type="date" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Type</div>
                                <div class="col col-2">Full-time:<input id="full" type="radio" /> Part-time:<input id="part" type="radio" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Skill Level</div>
                                <div class="col col-2"><input id="skill" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Company Description</div>
                                <div class="col col-2"><input id="cdesc" type="text" /></div>
                            </li>
                            <li class="table-row sa">
                                <div class="col col-2">Job Description</div>
                                <div class="col col-2"><input id="jdesc" type="text" /></div>
                            </li>
                        </ul>
                        <button class="button-7 center" type="submit">Post Job</button>
                    </form>
                </div>

            </div>
        </>
    );
}
