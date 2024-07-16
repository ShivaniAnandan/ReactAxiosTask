import React, { createContext, useContext, useState, useEffect } from 'react'; // Import necessary hooks from React
import axios from 'axios'; // Import axios for making API requests

// Create a context for users
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to provide user-related data and functions to children components
export const UserProvider = ({ children }) => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error); 
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to add a new user
  const addUser = async (user) => {
    try {
      // Simulate a successful addition with a unique ID
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]); 
    } catch (error) {
      console.error('Error adding user:', error); 
    }
  };

  // Function to edit an existing user
  const editUser = async (user) => {
    try {
      // Update the user in the state
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers); 
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      // Simulate a successful delete
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // Remove the user from the state
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers); 
    } catch (error) {
      console.error('Error deleting user:', error); 
    }
  };

  // Provide the user data and functions to children components
  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};


