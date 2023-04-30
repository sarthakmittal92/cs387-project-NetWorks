import "./network.css"
import React from "react";

import { SearchNetwork } from "../search_network/search_network";
import { InvitationsReceived } from "../invitations_received/invitations_received";
import { InvitationsSent } from "../invitations_sent/invitations_sent";
import { Connections } from "../connections/connections";
import { Navbar} from '../navbar/navbar'

export const Network = () => {
    return (
        <>
            <div class="network">
                <div class = "toolbar1">
                    <Navbar/> 
                </div>
                <br />
                <SearchNetwork />
                <br />
                <InvitationsReceived />
                <br />
                <InvitationsSent />
                <br />
                <Connections />
            </div>
        </>
    )
}
