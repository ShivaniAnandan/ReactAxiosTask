import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import { UserContext } from '../App';


const UserList = () => {
  
  const { users, deleteUser } = useContext(UserContext);
  
 
  // console.log(users);

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <div className="user-list">
        {users.map((user, index) => (
          // Generate a unique key for each user card using user.id
          <div key={`${user.id}`} className="user-card">
            {/* Conditionally render the avatar image based on user.id */}
            <img 
              src={`https://i.pravatar.cc/150?img=${user.id <= 10 ? user.id : user.avatarId}`} 
              alt={`${user.name}'s avatar`} 
            />
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <div className="user-actions">
                {/* Link to edit the user with the user's ID */}
                <Link to={`/edit/${user.id}`}>
                  <button>Edit</button>
                </Link>
                {/* Button to delete the user, calling deleteUser with the user's ID */}
                <button onClick={() => deleteUser(user.id)} className='delete-button'>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="create-button-container">
        {/* Link to navigate to the Create User page */}
        <Link to="/create">
          <button className="create-button">Create User</button>
        </Link>
      </div>
    </div>
  );
};

export default UserList;
