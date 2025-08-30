import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <main style={{ minHeight: "80vh", padding: "1rem" }}>
                    <Routes>
                        <Route path="/" element={<Note />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    );
};

export default App;
