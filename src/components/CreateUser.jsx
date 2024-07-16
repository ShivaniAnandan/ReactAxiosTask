import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useUserContext } from './UserContext'; // Import custom hook to use the user context
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating unique IDs


const CreateUser = () => {
  
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  // Access addUser function from UserContext to add a new user
  const { addUser } = useUserContext();
  
  const navigate = useNavigate();

  // Handle input field changes and update local state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in the user state
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Create a new user object with a unique ID and a random avatar ID
    const newUser = { 
      ...user, 
      id: uuidv4().slice(0, 2),
      avatarId: Math.floor(Math.random() * 70) + 1 // Generate random avatar ID between 1 and 70
    };
    // Add the new user to the context
    await addUser(newUser);
    // Navigate to the users list page
    navigate('/users');
  };

  return (
    <div className="create-user-container">
      <h1 className="title">Create User</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
