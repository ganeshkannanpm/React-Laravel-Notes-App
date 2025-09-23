import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const UpdateNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
    });

    const [loading, setLoading] = useState(true);

    //fetching note by id
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/notes/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                console.log(response.data.data);
                setForm({
                    title: response.data.data.title,
                    content: response.data.data.content,
                });
            } catch (error) {
                console.error(
                    "Error fetching note:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/notes/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Note updated successfully");
            navigate("/note");
        } catch (error) {
            console.error(
                "Error updating note:",
                error.response?.data || error.message
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    if (loading)
        return <p className="text-center text-white">Loading note...</p>;
    return (
        <>
            <div className="app-container">
                {/* Hamburger toggle */}
                <button
                    className="hamburger"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰
                </button>

                {/* Sidebar */}
                <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                    <h4 className="ms-4">My Notes</h4>
                    <ul>
                        <li>
                            <Link to="/note">📒 All Notes</Link>
                        </li>
                        <li>
                            <Link to="/favorites">⭐ Favorites</Link>
                        </li>
                        <li>
                            <Link to="/archived">📂 Archived</Link>
                        </li>
                        <li>
                            <Link to="/trash">🗑️ Trash</Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Overlay (only mobile) */}
                {sidebarOpen && (
                    <div
                        className="overlay"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <div className={`main-content ${sidebarOpen ? "shift" : ""}`}>
                    <Header />
                    <h2 className="text-white text-center mt-3">Update Note</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="container mt-5">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange}
                                            placeholder="Title"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            name="content"
                                            value={form.content}
                                            onChange={handleChange}
                                            placeholder="Take a note..."
                                            rows={3}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-primary"
                                    >
                                        Update
                                    </button>
                                    <Link
                                        to={"/note"}
                                        className="btn btn-sm btn-primary ms-2"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default UpdateNote;
