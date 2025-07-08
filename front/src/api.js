const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function register(username, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}


function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


export async function getProfile(userId, token) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: authHeaders(token),
  });
  return res.json();
}

export async function updateProfile(userId, updates, token) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
  return res.json();
}


export async function getBooks(token) {
  const res = await fetch(`${API_URL}/books`, {
    headers: authHeaders(token),
  });
  return res.json();
}

export async function getBookById(bookId, token) {
  const res = await fetch(`${API_URL}/books/${bookId}`, {
    headers: authHeaders(token),
  });
  return res.json();
}

export async function addBook(book, token) {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(book),
  });
  return res.json();
}

export async function updateBook(bookId, updates, token) {
  const res = await fetch(`${API_URL}/books/${bookId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteBook(bookId, token) {
  const res = await fetch(`${API_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}

export async function updateBookProgress(bookId, progress, token) {
  const res = await fetch(`${API_URL}/books/${bookId}/progress`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(progress),
  });
  return res.json();
}

export async function addFavorite(bookId, token) {
  const res = await fetch(`${API_URL}/books/${bookId}/favorite`, {
    method: "POST",
    headers: authHeaders(token),
  });
  return res.json();
}

export async function removeFavorite(bookId, token) {
  const res = await fetch(`${API_URL}/books/${bookId}/favorite`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}

export async function getRewards(token) {
  const res = await fetch(`${API_URL}/rewards`, {
    headers: authHeaders(token),
  });
  return res.json();
}

export async function assignReward(type, data, token) {
  const res = await fetch(`${API_URL}/rewards/${type}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function filterBooks(filters, token) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/books/filter?${params}`, {
    headers: authHeaders(token),
  });
  return res.json();
}
