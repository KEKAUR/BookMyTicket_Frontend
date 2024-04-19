import React from 'react';

const UserDetails = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>User Details</h2>
          {/* Display user details here */}
        </div>
      ) : (
        <div>
          <h2>Please log in to view user details</h2>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
