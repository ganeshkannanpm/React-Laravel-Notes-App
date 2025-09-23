import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import CreateNote from "./CreateNote";
import axios from "axios";
import Footer from "./Footer";

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // fetch notes
    const fetchNotes = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/notes",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setNotes(response.data.data.reverse()); // show latest first
        } catch (error) {
            console.error(
                "Error fetching notes:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // callback from CreateNote to add note instantly
    const handleNoteAdded = (newNote) => {
        setNotes([newNote, ...notes]);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    if (loading) return <p>Loading notes...</p>;

    return (
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
                        <button onClick={handleLogout} className="logout-btn">
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

            {/* Main content */}
            <div className={`main-content ${sidebarOpen ? "shift" : ""}`}>
                <Header />
                <CreateNote handleNoteAdded={handleNoteAdded} />

                {notes.length === 0 ? (
                    <p className="text-white text-center fs-4">
                        No Notes available!
                    </p>
                ) : (
                    <div className="notes-container">
                        {notes.map((note) => (
                            <div key={note.id} className="note-card">
                                <h1>{note.title}</h1>
                                <p>{note.content}</p>
                                <div>
                                    <Link
                                        to={`/viewNote/${note.id}`}
                                        className="btn btn-sm btn-primary"
                                    >
                                        👁️ View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Footer />
            </div>
        </div>
    );
};

export default Note;
