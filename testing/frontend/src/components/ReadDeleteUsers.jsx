import { useState, useEffect } from "react";
import axios from "axios";

export default function ReadDeleteUsers({ refresh, buttonClass = "btn btn-danger" }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch users from the server
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getUsers");
            setUsers(response.data);
            setFilteredUsers(response.data);
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
            await axios.delete(`http://localhost:3000/deleteUser/${id}`);
            fetchUsers();
            setMessage(`User with ID ${id} deleted successfully.`);
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));
        }
    };

    // Handle search functionality
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = users.filter((user) => 
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.age.toString().includes(query)
        );
        setFilteredUsers(filtered);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <ul>
                {users.map((user) => (
                    <li id={`li-${user.id}`} key={user.id}>
                        User ID: {user.id}, First Name: {user.firstName}, Last Name: {user.lastName}, Age: {user.age}
                        <button id={`delete-${user.id}`} onClick={() => handleDelete(user.id)} className={buttonClass}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
