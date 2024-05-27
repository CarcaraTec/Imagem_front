
  function storeUserData(userData: String) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  
  export default storeUserData;