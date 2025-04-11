import React, { useState, useEffect } from "react";
import UserApi from "../../Api/UserApi";
import { Spinner, Alert } from "react-bootstrap";

const AdminHandler = function () {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await UserApi.getUsers();
                setUsers(data);
            } catch (err) {
                setError("Could not fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Edits a user's profile for approval or update
    const editUser = async (id, updatedFields) => {
        if (!id) {
            setError('No user ID provided');
            setTimeout(() => setError(null), 2000);
            return;
        }

        try {
            setLoading(true);
            const updatedUser = await UserApi.editProfile(updatedFields, id);

            setUsers(users =>
                users.map(user => (user.id === id ? updatedUser : user))
            );
            setMessage("User added!")
            setTimeout(() => setMessage(null), 3000);


        } catch (err) {
            console.error("Edit failed:", err);
            setError("Could not update user profile");
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    // Handles deletion of a user.
    const deleteUser = async (id) => {

        console.log("Admin is deleting user:", id)
        if (!id) {
            setError("Wrong user ID")
            setTimeout(() => setError(null), 2000);
            return;
        }

        try {
            setLoading(true);
            await UserApi.deleteUser(id)
            setUsers(users => users.filter(u => u.id !== id));
            setMessage("User deleted!")

            setTimeout(() => {
                setMessage(null)
            }, 2000)

        } catch (error) {
            setError("Unable to delete user")
            setTimeout(() => setError(null), 2000);
        } finally {
            setLoading(false)
        }

    };

    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

    return (
        <div className="container mt-5 bg-light">
            <h1 className="mb-4 text-center">User Management</h1>

            <div>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
            </div>

            <table className="table table-bordered bg-white shadow-sm">
                <thead className="table-light">
                    <tr>

                        <th>ID</th>
                        <th>Full Name</th>

                        <th>Email</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName || ''} {user.lastName || ''}</td>
                            <td>{user.email || ''}</td>
                            <td>{user.state}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>

                                {user.state === "pending" && (
                                    <button
                                        className="btn btn-success btn-sm"


                                        onClick={() => {
                                            console.log("Approving user:", user.id);
                                            editUser(user.id, { state: "active" });
                                        }}
                                    >
                                        Approve
                                    </button>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default AdminHandler