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

  return (
    <div className="container">
      <h2 className="text-center mb-4">Users List</h2>
      {error && <p className="alert alert-danger">{error}</p>}

      {/* Table container */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                  <td>
                    {/* Action buttons */}
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => alert(`Editing user ${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => alert(`Deleting user ${user.id}`)}
                    >
                      Delete
                    </button>
                  </td>
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
    </div>
  );
}