import React, { useState } from "react";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validation
        let newErrors = {};
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0){
            console.log("Form submitted:", form);
            //Backend
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center">
                <div
                    className="bg-white p-4 rounded shadow w-100"
                    style={{ maxWidth: "400px" }}
                >
                    <h2 className="text-center mb-4">Login</h2>
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

                        <button
                            type="submit"
                            className="btn btn-primary w-100 "
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
