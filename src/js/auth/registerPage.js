import { registerUser } from './register.js';

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const success = registerUser(name, email, password);
  if (success) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('registerError').textContent =
      'Email already exists';
  }
});
