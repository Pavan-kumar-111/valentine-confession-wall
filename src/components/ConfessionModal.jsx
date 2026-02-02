import { useRef, useState } from "react";

const DAYS = [
  "Rose Day",
  "Propose Day",
  "Chocolate Day",
  "Teddy Day",
  "Promise Day",
  "Hug Day",
  "Valentine's Day"
];

const EMOJIS = ["❤️", "💖", "💌", "😍", "🥹", "😭"];
const DRAFT_KEY = "confession_draft_final";

export default function ConfessionModal({ onClose, onSubmit }) {
  const textareaRef = useRef(null);

  const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY)) || {};

  const [message, setMessage] = useState(savedDraft.message || "");
  const [day, setDay] = useState(savedDraft.day || DAYS[0]);
  const [showEmojis, setShowEmojis] = useState(false);
  const [heartId, setHeartId] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setHeartId(Date.now());
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ message: value, day })
    );
  };

  const insertEmoji = (emoji) => {
    const el = textareaRef.current;
    el.focus();

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const updated =
      message.substring(0, start) +
      emoji +
      message.substring(end);

    setMessage(updated);

    setTimeout(() => {
      el.selectionStart = el.selectionEnd =
        start + emoji.length;
    }, 0);

    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ message: updated, day })
    );

    setShowEmojis(false);
  };

  const submit = () => {
    if (!message.trim()) return;

    onSubmit({
      id: Date.now(),
      message,
      day,
      likes: 0,
      createdAt: Date.now()
    });

    localStorage.removeItem(DRAFT_KEY);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>💌 Write Your Anonymous Confession</h2>

        <div className="textarea-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            maxLength={300}
            placeholder="Write what your heart never said…"
          />

          {message && (
            <div key={heartId} className="heart-float">
              ❤️
            </div>
          )}
        </div>

        <div className="emoji-row">
          <button
            type="button"
            className="emoji-toggle"
            onClick={() => setShowEmojis(!showEmojis)}
          >
            😊 Add emoji
          </button>

          {showEmojis && (
            <div className="emoji-picker">
              {EMOJIS.map(e => (
                <button key={e} onClick={() => insertEmoji(e)}>
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <span>{message.length}/300</span>

          <select value={day} onChange={e => setDay(e.target.value)}>
            {DAYS.map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={submit}>
            Post Anonymously
          </button>
        </div>
      </div>
    </div>
  );
}
