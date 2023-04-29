import "./jobs.css"
import React from "react";

import { SearchJobs } from "../search_jobs/search_jobs";
import { JobsApplied } from "../jobs_applied/jobs_applied";

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
            </div>
        </>
    )
}
