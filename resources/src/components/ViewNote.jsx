import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
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
                const noteData = response.data.data;
                setNote(noteData);
            } catch (error) {
                console.error(
                    "Error fetching note:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [id]);

    // delete note
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this note?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setNotes(notes.filter((note) => note.id !== id)); // remove from state
        } catch (error) {
            console.error(
                "Error deleting note:",
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
    if (!note) return <p className="text-center text-danger">Note not found</p>;

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
                    <div className="container mt-5">
                        <div className="card p-4 shadow-lg">
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            <small className="text-muted">
                                Created at:{" "}
                                {new Date(note.created_at).toLocaleString()}
                            </small>
                            <div className="mt-3">
                                <Link
                                    to="/note"
                                    className="btn btn-primary btn-sm"
                                >
                                    ⬅ Back
                                </Link>
                                <Link
                                    to={`/editNote/${note.id}`}
                                    className="btn btn-sm btn-primary ms-2"
                                >
                                    ✏️ Update
                                </Link>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="btn btn-sm btn-primary ms-2"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ViewNote;
