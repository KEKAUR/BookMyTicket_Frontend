const userNameFromStorage = localStorage.getItem('userName');
const passwordFromStorage = localStorage.getItem('password');

// Check if username and password are available in localStorage
// If not, provide default values or handle the absence as needed
export const UserName = userNameFromStorage ? userNameFromStorage : 'defaultUsername';
export const Password = passwordFromStorage ? passwordFromStorage : 'defaultPassword';
export const Api_url = "http://localhost:3333/api/";