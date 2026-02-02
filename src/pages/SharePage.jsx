import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

import { getConfessions } from "../utils/localStorage";
import { templates } from "../components/Templates";
import { downloadImage } from "../utils/downloadImage";

export default function SharePage() {
  const { id } = useParams();
  const confessionId = Number(id);

  const confessions = getConfessions();
  const confession = confessions.find(c => c.id === confessionId);

  const cardRef = useRef(null);

  const [activeTemplate, setActiveTemplate] = useState(
    confession?.template || "romantic"
  );

  if (!confession) {
    return (
      <p style={{ textAlign: "center", marginTop: 40 }}>
        Confession not found 💔
      </p>
    );
  }

  const handleDownload = () => {
    downloadImage(cardRef.current, "valentine-confession.png");
  };

  return (
    <div className="share-page">
      {/* ===== PREVIEW ===== */}
      <div className="share-preview-wrapper">
        <div
          ref={cardRef}
          className={`share-card ${activeTemplate}`}
        >
          <p className="share-message">
            “{confession.message}”
          </p>

          <p className="share-day">{confession.day}</p>

       <div className="share-footer">
  <img
    src="/logo.png"
    alt="Valentine Confession Logo"
    className="share-logo"
  />
  <span>Anonymous Valentine Confession</span>
</div>

        </div>
      </div>

      {/* ===== TEMPLATE SELECTOR ===== */}
      <div className="template-bar">
        {templates.map(t => (
          <button
            key={t.id}
            className={activeTemplate === t.id ? "active" : ""}
            onClick={() => setActiveTemplate(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="share-actions">
        <button
          className="primary-btn"
          onClick={handleDownload}
        >
          Download Image
        </button>
      </div>
    </div>
  );
}
