import { useState } from "react";
import { loginAdmin } from "../utils/adminAuth";

export default function AdminLoginModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (loginAdmin(password)) {
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>🔐 Admin Access</h3>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
