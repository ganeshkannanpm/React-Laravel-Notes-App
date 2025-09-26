import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));

        axios
            .get("http://localhost:8000/api/admin/notes", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => setNotes(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="border p-2">{u.id}</td>
                                <td className="border p-2">{u.name}</td>
                                <td className="border p-2">{u.email}</td>
                                <td className="border p-2">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Notes</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((n) => (
                            <tr key={n.id}>
                                <td className="border p-2">{n.id}</td>
                                <td className="border p-2">{n.title}</td>
                                <td className="border p-2">{n.user?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
