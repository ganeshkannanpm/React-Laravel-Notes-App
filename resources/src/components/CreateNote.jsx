import React, { useState } from "react";
import axios from "axios";

const CreateNote = () => {
    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    };

    const submitNote = async (e) => {
        e.preventDefault();

        //Backend
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/notes",
                note,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("Note saved:", response.data);
            setNote({
                title: "",
                content: "",
            });
        } catch (error) {
            console.error(
                "Error saving note:",
                error.response?.data || error.message
            );
        }
    };

    const expand = () => {
        setExpanded(true);
    };

    return (
        <div>
            <form className="create-note">
                {isExpanded ? (
                    <input
                        type="text"
                        onChange={handleChange}
                        name="title"
                        value={note.title}
                        placeholder="Title"
                    />
                ) : null}

                <textarea
                    onClick={expand}
                    onChange={handleChange}
                    name="content"
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                ></textarea>
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
};

export default CreateNote;
