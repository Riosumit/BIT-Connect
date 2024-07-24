'use client'
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State variables for user data and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect to load user data from cookies when the component mounts
  useEffect(() => {
    const loadUserData = () => {
      const userData = Cookies.get('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  // Function to log in
  const login = async (username, password) => {
    try {
      // Perform login request
      const response = await axios.post(`${process.env.API_HOST}/login/`, { username, password });
      // Save user data in cookies
      Cookies.set('userData', JSON.stringify(response.data.user), { expires: 7 });
      sessionStorage.setItem('token', response.data.token);
      // Set user state
      setUser(response.data.user);
      return 'Login Successful';
    } catch (error) {
      console.error('Failed to login:', error);
      return 'Invalid credentials';
    }
  };

  // Function to sign up
  const signup = async (fullName, email, password) => {
    try {
      // Perform signup request
      const response = await axios.post(`${process.env.API_HOST}/signup/`, { username: email, email, password, full_name: fullName });
      // Save user data in cookies
      Cookies.set('userData', JSON.stringify(response.data.user), { expires: 7 });
      sessionStorage.setItem('token', response.data.token);
      // Set user state
      setUser(response.data.user);
      return 'Sign Up Successful';
    } catch (error) {
      console.error('Failed to signup:', error);
      return 'Invalid credentials';
    }
  };

  // Function to log out
  const logout = async () => {
    // Remove user data from cookies
    Cookies.remove('userData');
    sessionStorage.removeItem('token');
    // Set user state to null
    setUser(null);
  };

  // Provide the AuthContext to children components
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext
export default AuthContext;
