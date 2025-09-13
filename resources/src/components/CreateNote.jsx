import React, { useState } from "react";

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

    const submitNote = (e) => {
        e.preventDefault();
        //Backend

        setNote({
            title: "",
            content: "",
        });
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
