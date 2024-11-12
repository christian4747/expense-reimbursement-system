import { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import { store } from "../../globalData/store";
import axios from "axios";
import { IoSettingsSharp } from "react-icons/io5";

export const User: React.FC<{user: any}> = ({user}) => {

    const [version, setVersion] = useState(0)

    const [newUserRole, setNewUserRole] = useState(user.role)

    const [show, setShow] = useState(false)

    const [childHidden, setChildHidden] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSave = async () => {
        setShow(false)
        await axios.post(store.baseUrl + "users/role/" + user.userId, newUserRole, { headers: { 'Content-Type': 'text/plain' }})
        .then((res) => {
            user.role = newUserRole
            setVersion(version + 1)
        })
        .catch((err) => {
            console.log(err.message)
        })
        
    }

    const handleDelete = async () => {
        if (window.confirm(`Delete User with ID ${user.userId}?`)) {
            await axios.delete(store.baseUrl + "users/" + user.userId, { headers: {'Content-Type':'application/json'}})
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
                <td>{user.userId}</td>
                <td style={{textAlign: "center"}}>{user.firstName}</td>
                <td style={{textAlign: "center"}}>{user.lastName}</td>
                <td style={{textAlign: "center"}}>{user.username}</td>
                    
                <td style={{textAlign: "center"}}>
                    {user.role}
                </td>
                <td>
                    <Dropdown className="d-flex align-items-center justify-content-center">
                        <Dropdown.Toggle id="dropdown-basic">
                            <IoSettingsSharp />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShow}>Edit Role</Dropdown.Item>
                            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update User Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        {newUserRole === "manager" ? 
                            <Form.Select defaultValue={"manager"} onChange={(e) => setNewUserRole(e.target.value)}>
                                <option>manager</option>
                                <option>employee</option>
                            </Form.Select>
                            :
                            <Form.Select defaultValue={"employee"} onChange={(e) => setNewUserRole(e.target.value)}>
                                <option>manager</option>
                                <option>employee</option>
                            </Form.Select>
                        }
                    </Form.Group>
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