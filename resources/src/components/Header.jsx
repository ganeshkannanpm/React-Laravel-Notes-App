import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // store token at login
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else if (token) {
            axios
                .get("http://127.0.0.1:8000/api/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                })
                .catch(() => setUser(null));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
            <div className="container-fluid">
                <Link
                    className="navbar-brand text-white fs-4 fw-bold"
                    to="/"
                ></Link>
                <h3> My Notes</h3>

                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                <li className="nav-item me-3 mt-2">
                                    <span className="navbar-text text-white">
                                        👋Welcome, {user.name}
                                    </span>
                                </li>
                                {/* <li className="nav-item  btn-danger">
                                    <button
                                        onClick={handleLogout}
                                        className="nav-link text-white border-0 bg-transparent"
                                    >
                                        Logout
                                    </button>
                                </li> */}
                            </>
                        ) : (
                            <>
                                <li className="nav-item btn btn-sm btn-primary">
                                    <Link
                                        className="nav-link text-white"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item btn btn-sm btn-primary ms-4">
                                    <Link
                                        className="nav-link text-white"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
