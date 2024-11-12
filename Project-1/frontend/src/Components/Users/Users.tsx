import axios from "axios"
import { store } from "../../globalData/store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Table } from "react-bootstrap"
import { User } from "./User"
import { SiteNavbar } from "../SiteNavbar/SiteNavbar"

export const Users: React.FC = () => {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const getUsers = async () => {
        const response = await axios.get(store.baseUrl + "users")
        .then((res) => (
            setUsers(res.data)
        ))
        .catch((err) => (
            navigate("/")
        ))
    }

    useEffect(() => {

        getUsers()

    }, [])

    const mapUsers = () => {
        return users.sort((a: any, b: any) => a.userId - b.userId).map((user: any) => (
            <User key={user.userId} user={user}/>))
    }

    return (
        <>
            <SiteNavbar/>
            <Container className="shadow p-3 mt-2 mb-5 bg-white rounded">
                <h1>Users</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th style={{textAlign: "center"}}>User First Name</th>
                            <th style={{textAlign: "center"}}>User Last Name</th>
                            <th style={{textAlign: "center"}}>User Username</th>
                            <th style={{textAlign: "center"}}>User Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapUsers()}
                    </tbody>
                </Table>
            </Container>
        </>
    )

}