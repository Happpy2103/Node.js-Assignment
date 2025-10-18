export function saveToken(token) {
  localStorage.setItem('jwt_token', token);
}

export function getToken() {
  return localStorage.getItem('jwt_token');
}

export function removeToken() {
  localStorage.removeItem('jwt_token');
}

export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
