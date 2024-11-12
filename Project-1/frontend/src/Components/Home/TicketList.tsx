import axios from "axios"
import { store } from "../../globalData/store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Table } from "react-bootstrap"
import { Ticket } from "./Ticket"
import { FiRefreshCcw } from "react-icons/fi";

export const TicketList: React.FC = () => {

    const navigate = useNavigate()

    const [tickets, setTickets] = useState([])
    const [allTickets, setAllTickets] = useState([])
    const [statusSort, setStatusSort] = useState(localStorage.getItem("role"))
    const [role, setRole] = useState(localStorage.getItem("role"))

    // MODAL
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [errorMessage, setErrorMessage] = useState("");

    const validate = () => {
        if (ticket.description.length === 0){
            setErrorMessage("Ticket must have a description.")
            return false
        } else if (ticket.amount <= 0) {
            setErrorMessage("Ticket amount must be greater than 0.")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSave = async () => {
        if (validate()) {
            setShow(false)
            await axios.post(store.baseUrl + "tickets", ticket)
            .then((res) => {
                getTickets()
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }

    const [ticket, setTicket] = useState({
        description: "",
        amount: 0.00
    })

    const storeValues = (input: any) => {
        const name = input.target.name // the name of the input box that changed
        const value = input.target.value // the value in the input box

        // input = the entire event (which got passed in as an argument)
        // target = the specific input box that triggered the onChange event
        // name/value = the name/value of the input box

        // We need to send the entire user object to make a change to one field
        // "Take whatever input was changed, and set the matching field in user to the value in the input"
        // [name] can be EITHER username or password here
        setTicket((ticket) => ({...ticket, [name]: value}))

        // Remember the spread operator (...) lets us access the values of the object individually

    }

    const getTickets = async () => {
        if (role === "manager") {
            const response = await axios.get(store.baseUrl + "tickets/all")
            .then((res) => (
                setAllTickets(res.data)
            ))
            .catch((err) => (
                navigate("/login")
            ))
        } 

        const response = await axios.get(store.baseUrl + "tickets")
        .then((res) => (
            setTickets(res.data)
        ))
        .catch((err) => (
            navigate("/login")
        ))
        
    }

    const mapTickets = (sort: any) => {
        if (sort === "manager") {
            return allTickets.sort((a: any, b: any) => a.ticketId - b.ticketId).map((ticket: any) => (
                <Ticket key={ticket.ticketId} ticket={ticket}/>))
        } else if (sort === "employee-pending") {
            return tickets.sort((a: any, b: any) => a.ticketId - b.ticketId).map((ticket: any) => {
                if (ticket.status === "pending") {
                    return <Ticket key={ticket.ticketId} ticket={ticket}/>
                }})
        } else if (sort === "manager-pending") {
            return allTickets.sort((a: any, b: any) => a.ticketId - b.ticketId).map((ticket: any) => {
                if (ticket.status === "pending") {
                    return <Ticket key={ticket.ticketId} ticket={ticket}/>
                }})
        } else {
            return tickets.sort((a: any, b: any) => a.ticketId - b.ticketId).map((ticket: any) => {
                    return <Ticket key={ticket.ticketId} ticket={ticket}/>
                })
        }
    }

    useEffect(() => {
        getTickets()
    }, [])

    return (
        <>
            <div style={{gap: "5px"}} className="d-flex">
                <Button onClick={() => getTickets()}><FiRefreshCcw /></Button>
                {role === "manager" ? <Button onClick={() => setStatusSort("manager")}>All Tickets</Button> : ""}
                {role === "manager" ? <Button onClick={() => setStatusSort("manager-pending")}>All Pending Tickets</Button> : ""}
                <Button onClick={() => setStatusSort("employee")}>My Tickets</Button>
                <Button onClick={() => setStatusSort("employee-pending")}>My Pending Tickets</Button>
            </div>
            

            <Table>
                <thead>
                    <tr>
                        <th style={{width: "10%"}}>Ticket ID</th>
                        <th style={{textAlign: "center"}}>Ticket Description</th>
                        <th style={{textAlign: "center"}}>Ticket Amount</th>
                        <th style={{textAlign: "center"}}>Ticket Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mapTickets(statusSort)}
                </tbody>
            </Table>

            <Button variant="primary" onClick={handleShow}>
                Create New Ticket
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="description"
                        name="description"
                        onChange={storeValues}
                        style={{marginBottom: "5px"}}
                    />

                    <Form.Control
                        type="number"
                        placeholder="amount"
                        name="amount"
                        step=".01"
                        min="0"
                        onChange={(e) => {
                            e.target.value = parseFloat(e.target.value).toFixed(2)
                            storeValues(e)
                        }}
                    />

                    {errorMessage !== "" ? <p style={{color: "red"}}>{errorMessage}</p> : ""}

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}