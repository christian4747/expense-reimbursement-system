import React from "react"
import { TicketList } from "./TicketList"
import { Container } from "react-bootstrap"
import { SiteNavbar } from "../SiteNavbar/SiteNavbar"

export const Home: React.FC = () => {

    return (
    <>
        <SiteNavbar/>
        <Container className="shadow p-3 mt-2 mb-5 bg-white rounded">
            <h1>Tickets</h1>
            <TicketList/>
        </Container>
    </>
    )

}