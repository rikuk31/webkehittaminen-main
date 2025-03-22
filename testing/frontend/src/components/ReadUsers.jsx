import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'; // Make sure to import the styles

export default function ReadUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getUsers");
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
}