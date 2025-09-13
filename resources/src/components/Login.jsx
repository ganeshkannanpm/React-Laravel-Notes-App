import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); //React Router hook

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/login",
                    form
                );
                // Save token
                localStorage.setItem("token", res.data.access_token);

                // Save user info
                localStorage.setItem("user", JSON.stringify(res.data.user));

                alert("Login Successful");

                //Navigate to Note page after login
                navigate("/note");
            } catch (err) {
                setErrors({ general: "Invalid email or password" });
                console.error(err.response?.data || err.message);
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div
                className="login-body p-4 rounded shadow w-100"
                style={{ maxWidth: "400px", marginTop: "100px" }}
            >
                <h2 className="text-center mb-4">MyNotes</h2>
                <h5 className="text-center mb-4">Please login to continue</h5>

                {errors.general && (
                    <div className="alert alert-danger">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.email && (
                            <div className="text-danger small">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.password && (
                            <div className="text-danger small">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p style={{ marginTop: "15px", textAlign: "center" }}>
                    Not registered? <Link to="/register">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
