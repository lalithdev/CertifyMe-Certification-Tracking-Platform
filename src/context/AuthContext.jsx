import { createContext, useContext, useState, useEffect } from "react";
import defaultUsers from "../data/defaultUsers.json";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Get ALL users (JSON + localStorage)
  const getAllUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    return [...defaultUsers, ...storedUsers];
  };

  // SIGNUP
  const signup = (name, email, password, role) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = getAllUsers();

    const existingUser = allUsers.find((u) => u.email === email);

    if (existingUser) {
      return { success: false, message: "Account already exists." };
    }

    const newUser = { name, email, password, role };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    return { success: true };
  };

  // LOGIN
  const login = (email, password) => {
    const allUsers = getAllUsers();

    const foundUser = allUsers.find((u) => u.email === email);

    if (!foundUser) {
      return { success: false, message: "No account found." };
    }

    if (foundUser.password !== password) {
      return { success: false, message: "Incorrect password." };
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    setUser(foundUser);

    const formattedUser = {
  ...foundUser,
  name: foundUser.name
    ? foundUser.name
    : `${foundUser.firstName || ""} ${foundUser.lastName || ""}`.trim()
};

localStorage.setItem("loggedInUser", JSON.stringify(formattedUser));
setUser(formattedUser);

return { success: true, user: formattedUser };
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);