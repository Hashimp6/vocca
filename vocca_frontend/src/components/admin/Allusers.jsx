import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data.users);
    } catch (error) {
      setError("Error fetching users: " + error.message);
    }
  };

  const openModal = (userId) => {
    setSelectedUser(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete/${selectedUser}`);
      setUsers(users.filter((user) => user._id !== selectedUser));
      setSuccessMessage("User deleted successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
      closeModal();
    } catch (error) {
      setError("Error deleting user: " + error.message);
      closeModal();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="hidden md:grid md:grid-cols-3 bg-gray-200 font-bold">
            <div className="py-2 px-4">Name</div>
            <div className="py-2 px-4">Email</div>
            <div className="py-2 px-4">Actions</div>
          </div>
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 md:grid-cols-3 border-b hover:bg-gray-100"
            >
              <div className="py-2 px-4">
                <span className="font-bold md:hidden">Name: </span>
                {user.name}
              </div>
              <div className="py-2 px-4">
                <span className="font-bold md:hidden">Email: </span>
                {user.email}
              </div>
              <div className="py-2 px-4 flex justify-between md:justify-start items-center">
                <span className="font-bold md:hidden">Actions: </span>
                <button
                  onClick={() => openModal(user._id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  aria-label="Delete user"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
