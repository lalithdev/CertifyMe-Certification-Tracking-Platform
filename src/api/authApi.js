// Fake DB using localStorage

const USERS_KEY = "certifyme_users";

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(
    (u) => u.email === email && u.password === password
  );
};