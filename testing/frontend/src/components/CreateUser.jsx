import { useState } from "react";
import axios from "axios";
import React from "react";

export default function CreateUser({ onUserAdded, buttonClass = "btn btn-primary" }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/addUser", {
        firstName,
        lastName,
        age,
      });
      setMessage("User created successfully: " + response.data.firstName + " " + response.data.lastName);
      setFirstName("");
      setLastName("");
      setAge("");
      if (onUserAdded) onUserAdded(); // Calls the onUserAdded function if provided
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
<form onSubmit={handleSubmit} className="form-group">
  <input
    type="text"
    placeholder="First Name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Last Name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    required
  />
  <button type="submitCreate" className={buttonClass}>Create</button>
  {message && <p>{message}</p>}
</form>
  );
}