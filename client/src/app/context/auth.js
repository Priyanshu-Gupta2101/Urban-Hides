import { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "./../hooks/axiosinstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  useEffect(() => {
    // Load data from localStorage after the initial render
    const data = localStorage.getItem("auth");
    if (data) {
      setAuth(JSON.parse(data));
    }
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  useEffect(() => {
    // Set the Authorization header for axios whenever `auth.token` changes
    axiosInstance.defaults.headers.common["Authorization"] = auth?.token;
  }, [auth.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication data
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
