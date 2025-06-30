// Enregistre le token
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Récupère le token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Supprime le token
export const removeToken = () => {
  localStorage.removeItem('token');
};