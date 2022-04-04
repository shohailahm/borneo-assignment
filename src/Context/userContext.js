import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext({
  user: "",
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const local = localStorage.getItem("user");
      if (local) {
        setUser(JSON.parse(local));
        return navigate("/");
      }
      return navigate("/login");
    };
    checkUser();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
