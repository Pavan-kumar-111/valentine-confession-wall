const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export const loginAdmin = (key) => {
  if (key === ADMIN_KEY) {
    localStorage.setItem("admin", "true");
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin");
};

export const isAdmin = () => {
  return localStorage.getItem("admin") === "true";
};
