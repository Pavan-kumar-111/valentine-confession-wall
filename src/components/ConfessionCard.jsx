import { useState } from "react";
import { timeAgo } from "../utils/timeAgo";
import { containsProfanity } from "../utils/profanity";
import {
  hasLiked,
  markLiked,
  hasReacted,
  markReacted
} from "../utils/userActions";
import ShareModal from "./ShareModal";

export default function ConfessionCard({
  confession,
  reactions,
  onLike,
  onReact,
  onDelete,
  admin,
  highlight = false
}) {
  const [expanded, setExpanded] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateEmoji, setAnimateEmoji] = useState(null);

  const isLong = confession.message.length > 120;
  const liked = hasLiked(confession.id);

  const text =
    expanded || !isLong
      ? confession.message
      : confession.message.slice(0, 120) + "...";

  const handleLike = () => {
    if (liked) return;
    markLiked(confession.id);
    onLike(confession.id);
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300);
  };

  const handleReact = (emoji) => {
    if (hasReacted(confession.id, emoji)) return;
    markReacted(confession.id, emoji);
    setAnimateEmoji(emoji);
    onReact(confession.id, emoji);
    setTimeout(() => setAnimateEmoji(null), 300);
  };

  return (
    <>
      <div className={`confession-card ${highlight ? "highlight-card" : ""}`}>
        {highlight && (
          <div className="confession-of-day">
            🧠 Confession of the Day
          </div>
        )}

        <div className="card-top">
          <span className="day-tag">{confession.day}</span>
          {confession.likes >= 5 && (
            <span className="trending">🔥 Trending</span>
          )}
        </div>

        {containsProfanity(confession.message) && !reveal ? (
          <div className="blur-text" onClick={() => setReveal(true)}>
            Tap to reveal sensitive confession
          </div>
        ) : (
          <p className="message">“{text}”</p>
        )}

        {isLong && (
          <button
            className="read-more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* REACTIONS UNDER TEXT */}
        <div className="reactions reactions-under-text">
          {["🥹", "💔", "😭"].map((emoji) => {
            const reacted = hasReacted(confession.id, emoji);
            return (
              <button
                key={emoji}
                className={`reaction-btn ${
                  reacted ? "reacted" : ""
                } ${animateEmoji === emoji ? "emoji-pop" : ""}`}
                disabled={reacted}
                onClick={() => handleReact(emoji)}
              >
                {emoji} {reactions[emoji] || 0}
              </button>
            );
          })}
        </div>

        <div className="card-footer">
          <small>{timeAgo(confession.createdAt)}</small>

          <div className="card-actions">
            <button
              className={`like-btn ${liked ? "liked" : ""} ${
                animateLike ? "like-animate" : ""
              }`}
              disabled={liked}
              onClick={handleLike}
            >
              ❤️ {confession.likes}
            </button>

         <button
  className="share-btn"
  onClick={() => window.open(`/share/${confession.id}`, "_blank")}
>
  📤
</button>


            {admin && (
              <button
                className="delete-btn"
                onClick={() => onDelete(confession.id)}
              >
                🗑
              </button>
            )}
          </div>
        </div>
      </div>

      {showShare && (
        <ShareModal
          confession={confession}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  );
}
