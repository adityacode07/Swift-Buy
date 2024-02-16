const fetchUserData = async () => {
    const response = await fetch('https://dummyjson.com/users');
    const userData = await response.json();
    return userData;
  };
  
  export { fetchUserData };
  