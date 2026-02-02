const STORAGE_KEY = "is_admin";

/* Read admin key from env (Vite only) */
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

/* Login */
export function loginAdmin(inputKey) {
  if (inputKey === ADMIN_KEY) {
    localStorage.setItem(STORAGE_KEY, "true");
    return true;
  }
  return false;
}

/* Logout */
export function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEY);
}

/* Check admin */
export function isAdmin() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}
