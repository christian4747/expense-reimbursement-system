import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";

export const Login: React.FC = () => {

    // A state object that holds username nad password
    const [loginCreds, setLoginCreds] = useState({
        username: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("");

    const validate = () => {
        if (loginCreds.username.length === 0){
            setErrorMessage("Please enter a valid username.")
            return false
        } else if (loginCreds.password.length === 0) {
            setErrorMessage("Please enter a valid password.")
            return false
        }
        return true
    }

    // We need a useNavigate hook to navigate between components programatically
    // Which means we don't have to manually switch the URL
    const navigate = useNavigate();

    // Function that stores user input
    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setLoginCreds((loginCreds) => ({...loginCreds, [name]: value}))
    }

    // Function that sends login POST request to the server
    // This navigates to /pets if role is "User" and /users if role is "Admin"
    const login = async () => {

        if (validate()) {
            // Use the username/password in loginCreds state object
            const response = await axios.post(store.baseUrl + "auth", loginCreds)
            .then((res) => {

                // Saving and accessing the logged in user data globally
                localStorage.setItem("userId", res.data.userId)
                localStorage.setItem("username", res.data.username)
                localStorage.setItem("firstName", res.data.firstName)
                localStorage.setItem("lastName", res.data.lastName)
                localStorage.setItem("role", res.data.role)

                // Depending on the User's role, send them to /pets or /users
                // if (store.loggedInUser.role === "user") {
                // } else if (store.loggedInUser.role === "admin") {
                    navigate("/")
                // }
            })
            .catch((error) => { setErrorMessage(error.response.data) })
        }
        
    }

    return (
        <div style={{height: "80vh"}} className="d-flex text-center align-items-center justify-content-center">
            <div style={{gap: "5px", height: "350px", width: "350px"}} className="d-flex flex-column text-center align-items-center justify-content-center shadow p-3 mt-2 mb-5 bg-white rounded"> 
                <h3>Login</h3>
            
                <div>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>

                {errorMessage !== "" ? <p style={{color: "red", marginBottom: "0"}}>{errorMessage}</p> : ""}

                <div>
                    <Button className="btn-success m-1" onClick={login}>Login</Button>
                    <Button className="btn-dark" onClick={()=>navigate("/register")}>Register</Button>
                </div>
            </div>
        </div>
    )

}