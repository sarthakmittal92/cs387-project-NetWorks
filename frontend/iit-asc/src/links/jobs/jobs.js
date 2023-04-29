import "./jobs.css"
import React from "react";

import { SearchJobs } from "../search_jobs/search_jobs";
import { JobsApplied } from "../jobs_applied/jobs_applied";
import { JobsCreated } from "../jobs_created/jobs_created";
// import { JobsAccepted } from "../jobs_accepted/jobs_accepted";

export const Jobs = () => {
    return (
        <>
            <div class="jobs">
                <div class="toolbar">
                    Toolbar
                </div>
                <br />
                <SearchJobs />
                <br />
                <JobsApplied />
                <br />
                <JobsCreated />
                {/* <br />
                <JobsAccepted /> */}
            </div>
        </>
    )
}
