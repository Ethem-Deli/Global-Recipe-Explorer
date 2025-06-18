import { isAuthenticated } from './auth.js';

export function requireAuth() {
  if (!isAuthenticated()) {
    alert('You must be logged in to access this page.');
    window.location.href = 'login.html';
  }
}
