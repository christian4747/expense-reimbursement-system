import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { store } from '../../globalData/store';

export const SiteNavbar: React.FC = () => {

    const navigate = useNavigate()

    const logout = () => {
        axios.post(store.baseUrl + "auth/logout")
        localStorage.clear()
        navigate("/login")
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand style={{cursor: "pointer"}} onClick={() => navigate("/")}>Employee Reimbursement System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {localStorage.getItem("role") === "manager" ? <Nav.Link onClick={() => navigate("/")}>Tickets</Nav.Link> : ""}
                {localStorage.getItem("role") === "manager" ? <Nav.Link onClick={() => navigate("/users")}>Users</Nav.Link> : ""}
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );

}