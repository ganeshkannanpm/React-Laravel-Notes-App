import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name) newErrors.name = "Name is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";
        if (form.password !== form.password_confirmation)
            newErrors.password_confirmation = "Password do not match";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("Form submitted:", form);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.password_confirmation,
                }
            );

            console.log(response.data);
            alert("Registration successfull");
            setErrors({});
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div
                className="p-4 rounded shadow-lg w-100"
                style={{ maxWidth: "400px", marginTop: "100px" }}
            >
                <h2 className="text-center text-white mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.name && (
                            <div className="text-danger small">
                                {errors.name}
                            </div>
                        )}
                    </div>

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

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.password_confirmation && (
                            <div className="text-danger small">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-dark w-100 ">
                        Register
                    </button>
                </form>
                <p style={{ marginTop: "15px", textAlign: "center" }}>
                    Already registered? <Link to="/login" className="text-white text-decoration-none">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
