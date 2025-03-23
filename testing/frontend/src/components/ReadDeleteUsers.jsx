import { useState, useEffect } from "react";
import axios from "axios";

export default function ReadDeleteUsers({ refresh, buttonClass = "btn btn-danger" }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(""); // State for user ID to delete

    // Fetch users from the server
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getUsers");
            setUsers(response.data);
            setFilteredUsers(response.data); // Initialize filteredUsers with all users
        } catch (err) {
            setError("Error fetching users: " + (err.response?.data?.error || err.message));
        }
    };

    // Re-fetch users when `refresh` prop changes
    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    // Handle deleting a user
    const handleDelete = async () => {
        if (!deleteUserId) {
            setMessage("Please enter a user ID to delete.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:3000/deleteUser/${deleteUserId}`);
            fetchUsers(); // Refresh the user list after deletion
            setMessage(`User with ID ${deleteUserId} deleted successfully.`);
            setDeleteUserId(""); // Clear the input field
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));
        }
    };

    // Handle search functionality
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = users.filter((user) => {
            return (
                user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.age.toString().includes(query)
            );
        });
        setFilteredUsers(filtered);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}

            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or Age"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Delete User Input and Button */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter User ID to Delete"
                    value={deleteUserId}
                    onChange={(e) => setDeleteUserId(e.target.value)}
                />
                <button className={buttonClass} id="deleteButton" onClick={handleDelete}>
                    Delete User
                </button>
            </div>

            {/* Users Table */}
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.age}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}