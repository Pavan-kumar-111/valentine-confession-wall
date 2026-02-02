import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { templates } from "./Templates";

export default function ShareModal({ confession, onClose }) {
  const cardRef = useRef(null);
  const [activeTemplate, setActiveTemplate] = useState("romantic");

  const downloadImage = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true
    });

    const link = document.createElement("a");
    link.download = "valentine-confession.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal share-modal">

        {/* ❌ Close Button */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>📤 Share Confession</h2>

        {/* ✅ CENTERED PREVIEW */}
        <div className="share-preview-wrapper">
          <div
            ref={cardRef}
            className={`share-card ${activeTemplate}`}
          >
            <p className="share-message">
              “{confession.message}”
            </p>

            <span className="share-day">{confession.day}</span>

            <small className="share-footer">
              Anonymous Valentine Confession 💘
            </small>
          </div>
        </div>

        {/* 🎨 Template Selector */}
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

        {/* ⬇ Actions */}
        <div className="modal-actions">
          <button className="primary-btn" onClick={downloadImage}>
            Download Image
          </button>
        </div>

      </div>
    </div>
  );
}
