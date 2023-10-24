import { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "./../hooks/axiosinstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      setAuth(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
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
