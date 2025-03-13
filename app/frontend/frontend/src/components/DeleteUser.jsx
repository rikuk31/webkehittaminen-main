import { useState } from "react";
import axios from "axios";

export default function DeleteUser() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.delete(`http://localhost:3000/deleteUser/${id}`);
      setMessage("User deleted successfully with ID: " + response.data.id);
      setId(""); // Clear input after successful deletion
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="form-group">
      <h3>Delete User</h3>
      <input
        type="text"
        placeholder="User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-danger" onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}
