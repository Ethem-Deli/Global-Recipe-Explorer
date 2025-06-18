import { loginUser } from './login.js';

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const success = loginUser(email, password);
  if (success) {
    window.location.href = 'index.html';
  } else {
    document.getElementById('loginError').textContent = 'Invalid credentials';
  }
});
