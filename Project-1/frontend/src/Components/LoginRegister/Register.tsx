import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const Register: React.FC = () => {

    // Define a state object to store the username and password
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    })

    const navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const validate = () => {
        if (user.firstName.length === 0){
            setErrorMessage("Please enter a first name.")
            return false
        } else if (user.lastName.length === 0) {
            setErrorMessage("Please enter a last name.")
            return false
        } else if (user.username.length === 0) {
            setErrorMessage("Please enter a username.")
            return false
        } else if (user.password.length === 0) {
            setErrorMessage("Please enter a password.")
            return false
        }
        return true
    }

    const storeValues = (input: any) => {
        const name = input.target.name // the name of the input box that changed
        const value = input.target.value // the value in the input box

        // input = the entire event (which got passed in as an argument)
        // target = the specific input box that triggered the onChange event
        // name/value = the name/value of the input box

        // We need to send the entire user object to make a change to one field
        // "Take whatever input was changed, and set the matching field in user to the value in the input"
        // [name] can be EITHER username or password here
        setUser((user) => ({...user, [name]: value}))

        // Remember the spread operator (...) lets us access the values of the object individually

    }

    // Register function that sends username/password to the backend
    const register = async () => {

        if (validate()) {
            // console.log(user)

            // POST REQUEST - send the new user info to the backend
            const response = await axios.post(store.baseUrl + "users", user)
            .then(() => {
                setErrorMessage("")
                setSuccessMessage("User made successfully! Please login.")
            })
            .catch((error) => {
                setErrorMessage(error.response.data)
            })
            .finally(() => {})
        }
        
    }

    return(
        <div style={{height: "80vh"}} className="d-flex text-center align-items-center justify-content-center">
            <div style={{gap: "5px", height: "350px", width: "350px"}} className="d-flex flex-column text-center align-items-center justify-content-center shadow p-3 mt-2 mb-5 bg-white rounded">
                <h3>Register</h3>

                <div>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={storeValues}
                    />
                </div>

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
                {successMessage !== "" ? <p style={{color: "green", marginBottom: "0"}}>{successMessage}</p> : ""}

                <div>
                    <Button onClick={register} className="btn-success m-1">Register</Button>
                    <Button className="btn-dark" onClick={() => navigate("/login")}>Back</Button>
                </div>
            </div>
        </div>
    )   

}