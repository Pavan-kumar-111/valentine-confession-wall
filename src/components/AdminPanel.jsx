import { useState } from "react";
import { loginAdmin, logoutAdmin, isAdmin } from "../utils/adminAuth";

export default function AdminPanel({ refresh }) {
  const [key, setKey] = useState("");
  const admin = isAdmin();

  const handleLogin = () => {
    const success = loginAdmin(key);
    if (!success) {
      alert("Invalid admin key");
    }
    setKey("");
    refresh();
  };

  const handleLogout = () => {
    logoutAdmin();
    refresh();
  };

  if (admin) {
    return (
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button className="secondary-btn" onClick={handleLogout}>
          Logout Admin
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "right", marginBottom: 10 }}>
      <input
        type="password"
        placeholder="Admin key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ marginRight: 6 }}
      />
      <button className="secondary-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
