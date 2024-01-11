import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, reset, searchUser } from "../../features/auth/adminAuthSlice";
import UserList from "../../components/UserList";
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminAuth
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
      return;
    }

    if (searchQuery) {
      dispatch(searchUser(searchQuery));
    } else {
      dispatch(getAllUsers());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, admin, navigate, searchQuery]);

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearchQuery(event.target.value);
  };

  if (!admin) {
    return null;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Users loaded successfully!</p>}
      {isError && <p>Error: {message}</p>}
      <div className="form-group">
        <input
          type="text"
          placeholder="Search User"
          className="form-control"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <UserList />
    </div>
  );
}

export default AdminDashboard;