import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setFailedLogin(false);
    }, [username, password]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fetch api POST request to login

        fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            // Check if response is ok
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Password or username is incorrect");
                }
            })
            .then((responseJson) => {
                // Store the token in local storage
                localStorage.setItem("token", responseJson.token);

                // Redirect to the page the user was trying to access
                if (location.state && location.state.from) {
                    navigate(location.state.from);
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                setFailedLogin(error.message);
            });
    };

    return (
        <div className="row g-0 justify-content-center align-items-center vh-100 login-container">
            <div className="col-10 row g-0 align-items-center border bg-white">
                <div className="col-6">
                    <img
                        src="https://burst.shopifycdn.com/photos/a-bridge-sitting-in-thick-pink-and-purple-fog.jpg?width=1000&format=pjpg&exif=0&iptc=0"
                        className="img-fluid"
                        alt="Oil Rig Admin Logo"
                    />
                </div>

                <form className="col-6 py-6 px-2" onSubmit={handleSubmit}>
                    <h4 className="login-title text-center py-2 mb-3">Login</h4>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="usernameInput"
                            placeholder="Username"
                            onChange={handleUsernameChange}
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                        <label htmlFor="floatingInput">Password</label>
                    </div>

                    <div className="text-center mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        {failedLogin && (
                            <div className="alert alert-danger" role="alert">
                                {failedLogin}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
