// Mock user data
const users = [
  { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' },
];

export function login(email: string, password: string) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // In a real app, you'd use a proper authentication method (e.g., JWT)
    localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('user');
}

export function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return !!getUser();
}