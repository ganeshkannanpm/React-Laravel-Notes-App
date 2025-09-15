import React, { useEffect, useState } from "react";
import Header from "./Header";
import CreateNote from "./CreateNote";
import axios from "axios";

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                //API response is an object with a data property, and data is the array of notes
                setNotes(response.data.data.reverse()); //  use the array inside `data`
            } catch (error) {
                console.error(
                    "Error fetching notes:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    if (loading) return <p>Loading notes...</p>;

    return (
        <>
            <Header />
            <CreateNote />
            {notes.length === 0 ? (
                <p>No notes available</p>
            ) : (
                <div className="notes-container">
                    {notes.map((note) => (
                        <div key={note.id} className="note-card">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Note;
