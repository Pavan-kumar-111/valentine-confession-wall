import { useEffect, useRef } from "react";
import ConfessionCard from "./ConfessionCard";
import { createObserver } from "../utils/observer";

export default function ConfessionList({
  confessions,
  reactions,
  onLike,
  onReact,
  onDelete,
  admin,
  loadMore,
  hasMore
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const obs = createObserver(loadMore);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hasMore, loadMore]);

  if (confessions.length === 0) {
    return (
      <p className="empty-state">
        💭 No confessions yet.
        <br />
        Be the first brave heart ❤️
      </p>
    );
  }

  return (
    <>
      <div className="confession-list-container">
        {confessions.map((c) => (
          <ConfessionCard
            key={c.id}
            confession={c}
            reactions={reactions[c.id] || {}}
            onLike={onLike}
            onReact={onReact}
            onDelete={onDelete}
            admin={admin}
          />
        ))}
      </div>
      {hasMore && (
        <div 
          ref={ref} 
          style={{ 
            height: 40, 
            gridColumn: "1 / -1", 
            width: "100%",
            marginTop: 20 
          }} 
        />
      )}
    </>
  );
}
