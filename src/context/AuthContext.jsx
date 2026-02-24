import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged in user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // SIGNUP
  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return { success: false, message: "Account already exists." };
    }

    const newUser = {
      name,
      email,
      password,
      role: "student"
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };

  // LOGIN
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      return { success: false, message: "No account found. Please create one." };
    }

    if (foundUser.password !== password) {
      return { success: false, message: "Incorrect password." };
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    setUser(foundUser);

    return { success: true };
  };

  // LOGOUT
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