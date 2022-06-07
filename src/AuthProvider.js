import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt");
    setConnected(Boolean(hasJwt));
  }, []);

  function disconnect() {
    navigate("/");
    setConnected(false);
    localStorage.removeItem("jwt");
  }

  const value = { connected, disconnect, setConnected };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
