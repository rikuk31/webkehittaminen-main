import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#e9ecef" }}>
      <h1 className="text-center mb-5 text-dark font-weight-bold" style={{ fontSize: "36px" }}>
        User Management
      </h1>
      <div className="w-75">
        <div className="card p-4 shadow-lg mb-4 bg-white rounded-4 border-0" style={{ borderLeft: "5px solid #0d6efd" }}>
          <h2 className="text-center text-primary mb-4">Create User</h2>
          <div className="d-flex flex-column align-items-center">
            <CreateUser onUserAdded={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-primary w-100 mt-3" />
          </div>
        </div>

        <div className="card p-4 shadow-lg mb-4 bg-white rounded-4 border-0" style={{ borderLeft: "5px solid #dc3545" }}>
          <h2 className="text-center text-danger mb-4">Users List</h2>
          <div className="d-flex flex-column align-items-center">
            <ReadDeleteUsers refresh={refresh} searchQuery={searchQuery} buttonClass="btn btn-danger w-100 mt-2" />
          </div>
        </div>

        <div className="card p-4 shadow-lg mb-4 bg-white rounded-4 border-0" style={{ borderLeft: "5px solid #ffc107" }}>
          <h2 className="text-center text-warning mb-4">Update User</h2>
          <div className="d-flex flex-column align-items-center">
            <UpdateUser onUserUpdated={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-warning w-100 mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
