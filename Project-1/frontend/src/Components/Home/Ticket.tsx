import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import { store } from "../../globalData/store";
import { IoSettingsSharp } from "react-icons/io5";

export const Ticket: React.FC<{ticket: any}> = ({ticket}) => {


    const [version, setVersion] = useState(0)

    const [editedTicket, setEditedTicket] = useState(ticket.description)

    const [show, setShow] = useState(false);

    const role = localStorage.getItem("role")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [errorMessage, setErrorMessage] = useState("");

    const validate = () => {
        if (editedTicket.length === 0){
            setErrorMessage("Ticket must have a description.")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSave = async () => {
        if (validate()) {
            setShow(false)
            await axios.post(store.baseUrl + "tickets/description/" + ticket.ticketId, editedTicket, { headers: { 'Content-Type': 'text/plain' }})
            .then((res) => {
                ticket.description = editedTicket
                setVersion(version + 1)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }

    }

    const [editedTicketStatus, setEditedTicketStatus] = useState(ticket.status)

    const [showStatusModal, setShowStatusModal] = useState(false);

    const handleCloseStatusModal = () => setShowStatusModal(false);
    const handleShowStatusModal = () => setShowStatusModal(true);

    const handleSaveStatusModal = async () => {
        setShowStatusModal(false)
        await axios.post(store.baseUrl + "tickets/status/" + ticket.ticketId, editedTicketStatus, { headers: { 'Content-Type': 'text/plain' }})
        .then((res) => {
            ticket.status = editedTicketStatus
            setVersion(version + 1)
        })
        .catch((err) => {
            console.log(err.message)
        })
        
    }

    const [childHidden, setChildHidden] = useState(false)

    const handleDelete = async () => {

        if (window.confirm(`Delete Ticket with ID ${ticket.ticketId}?`) === true) {
            await axios.delete(store.baseUrl + "tickets/" + ticket.ticketId, { headers: {'Content-Type':'application/json'}})
            .then((res) => {
                setChildHidden(true)
                setVersion(version + 1)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }

    return (
        <>
            <tr style={{verticalAlign: "middle"}} hidden={childHidden}>
                <td style={{width: "10%"}}>{ticket.ticketId}</td>
                    
                <td style={{textAlign: "center"}}>
                    {ticket.description}
                </td>

                <td style={{textAlign: "center"}}>${ticket.amount.toFixed(2)}</td>
                <td style={{textAlign: "center"}}>
                    {ticket.status === "approved" ? "🟢 APPROVED 🟢":
                        ticket.status === "pending" ? "🟡 PENDING 🟡":
                        ticket.status === "denied" ? "🔴 DENIED 🔴":
                        ticket.status}
                </td>

                <td>
                    <Dropdown className="d-flex align-items-center justify-content-center">
                        <Dropdown.Toggle id="dropdown-basic">
                            <IoSettingsSharp />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShow}>Edit Description</Dropdown.Item>
                            {role === "manager" ? <Dropdown.Item onClick={handleShowStatusModal}>Edit Status</Dropdown.Item> : "" }
                            {role === "manager" ? <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item> : "" }
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Ticket Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="description"
                        name="description"
                        value={editedTicket}
                        onChange={(e) => {setEditedTicket(e.target.value)}}
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

            <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
                <Modal.Header closeButton>
                <Modal.Title>Update Ticket Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        {editedTicketStatus === "pending" ? 
                            <Form.Select defaultValue={"pending"} onChange={(e) => setEditedTicketStatus(e.target.value)}>
                                <option>pending</option>
                                <option>approved</option>
                                <option>denied</option>
                            </Form.Select>
                            : editedTicketStatus === "approved" ?
                            <Form.Select defaultValue={"approved"} onChange={(e) => setEditedTicketStatus(e.target.value)}>
                                <option>pending</option>
                                <option>approved</option>
                                <option>denied</option>
                            </Form.Select>
                            :
                            <Form.Select defaultValue={"denied"} onChange={(e) => setEditedTicketStatus(e.target.value)}>
                                <option>pending</option>
                                <option>approved</option>
                                <option>denied</option>
                            </Form.Select>
                        }
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseStatusModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveStatusModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    )

}