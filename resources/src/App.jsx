import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Note from "./components/Note";
import Register from "./components/Register";
import Login from "./components/Login";
import UpdateNote from "./components/UpdateNote";
import ViewNote from "./components/ViewNote";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/note" element={<Note />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/viewNote/:id" element={<ViewNote />} />
                    <Route path="/editNote/:id" element={<UpdateNote />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
