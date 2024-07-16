import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { useUserContext } from './UserContext'; 


const EditUser = () => {
  // Extract the user ID from the route parameters
  const { id } = useParams();
  const { users, editUser } = useUserContext();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Find the user to edit from the users list using the ID from the route parameters
    const userToEdit = users.find((u) => u.id === parseInt(id));
    // If the user is found, set the local state with the user's data
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [id, users]);

  // Handle input field changes and update local state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in the user state
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Update the user data in the context
    await editUser(user);
    // Navigate to the users list page
    navigate('/users');
  };

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-input"
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
            className="form-input"
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
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
