import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import CreateNote from "./CreateNote";
import axios from "axios";
import Footer from "./Footer";

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

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
        setNotes([newNote, ...notes]); // add new note at top
    };

    if (loading) return <p>Loading notes...</p>;

    return (
        <>
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
                            <div className="">
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
        </>
    );
};

export default Note;
