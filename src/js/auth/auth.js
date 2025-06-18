// Register a new user
export function registerUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify(newUser));
}

// Log in existing user
export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user));
}

// Log out
export function logoutUser() {
  localStorage.removeItem('loggedInUser');
}

// Get current logged in user
export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}

// Check if user is logged in
export function isAuthenticated() {
  return !!localStorage.getItem('loggedInUser');
}
