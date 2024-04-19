// User.js
import React from 'react';

const User = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    return (
        <div>
            <h1>User Details</h1>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Add more user details as needed */}
        </div>
    );
}

export default User;
