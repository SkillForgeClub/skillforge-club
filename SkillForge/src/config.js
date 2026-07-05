let base = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://localhost:5000/api";
if (!base.endsWith('/api')) {
  base = base.replace(/\/$/, '') + '/api';
}
export const API_BASE = base;
export const ASSET_BASE = API_BASE.replace(/\/api$/, '');
