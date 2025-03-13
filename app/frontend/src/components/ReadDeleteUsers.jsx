import { useState, useEffect } from "react";
import axios from "axios";

export default function ReadDeleteUsers({ refresh, buttonClass = "btn btn-danger" }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch users from the server
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getUsers");
            setUsers(response.data);
        } catch (err) {
            setError("Error fetching users: " + (err.response?.data?.error || err.message));
        }
    };

    // Re-fetch users when `refresh` prop changes
    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    // Handle deleting a user
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteUser/${id}`);
            fetchUsers(); // Refresh the user list after deletion
            setMessage(`User with ID ${id} deleted successfully.`);
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h3>Users List</h3>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.age}</td>
                            <td><button onClick={() => handleDelete(user.id)} className={buttonClass}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
