import { useState } from "react";
import axios from "axios";

export default function UpdateUser({ onUserUpdated, buttonClass = "btn btn-warning" }) {
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await axios.put(`http://localhost:3000/updateUser/${id}`, {
                firstName,
                lastName,
                age,
            });
            setMessage("User updated successfully: " + response.data.id);
            setId("");
            setFirstName("");
            setLastName("");
            setAge("");
            if (onUserUpdated) onUserUpdated(); // Calls the refresh function
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="form-group">
            <input
                type="text"
                placeholder="Current User ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="New First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="New Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="New Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <button type="submit" className={buttonClass} onClick={handleUpdate}>Update</button>
            {message && <p>{message}</p>}
        </div>
    );
}

