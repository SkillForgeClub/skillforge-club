let base = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

if (!base) {
  // If we are in the browser and the hostname is not localhost, fallback to Render backend
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    base = "https://skillforge-backend-o793.onrender.com/api";
  } else {
    base = "http://localhost:5000/api";
  }
}

if (!base.endsWith('/api')) {
  base = base.replace(/\/$/, '') + '/api';
}
export const API_BASE = base;
export const ASSET_BASE = API_BASE.replace(/\/api$/, '');
