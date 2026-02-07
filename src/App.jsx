import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import ConfessionModal from "./components/ConfessionModal";
import ConfessionList from "./components/ConfessionList";
import AdminPanel from "./components/AdminPanel";
import ConfessionCard from "./components/ConfessionCard";

import SharePage from "./pages/SharePage";

import {
  getConfessions,
  saveConfessions,
  getReactions,
  saveReactions
} from "./utils/localStorage";

import { trackActivity } from "./utils/analytics";
import { isAdmin } from "./utils/adminAuth";

/* =====================================================
   HOME VIEW (UPDATED)
===================================================== */
import { playPop } from "./utils/audio"; // Import sound

function HomeView() {
  const [confessions, setConfessions] = useState(() => getConfessions());
  const [reactions, setReactions] = useState(() => getReactions());

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(10);
  const [admin, setAdmin] = useState(isAdmin());

  // New States
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const refreshAdmin = () => setAdmin(isAdmin());

  // Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ================= ADD CONFESSION ================= */
  const addConfession = (confession) => {
    const updated = [confession, ...confessions];
    setConfessions(updated);
    saveConfessions(updated);
    trackActivity();
    playPop(); // Sound effect
  };

  /* ================= LIKE ================= */
  const likeConfession = (id) => {
    const updated = confessions.map(c =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setConfessions(updated);
    saveConfessions(updated);
    playPop(); // Sound effect
  };

  /* ================= REACTIONS ================= */
  const reactToConfession = (id, emoji) => {
    const updated = { ...reactions };
    updated[id] = updated[id] || {};
    updated[id][emoji] = (updated[id][emoji] || 0) + 1;
    setReactions(updated);
    saveReactions(updated);
    playPop(); // Sound effect
  };

  /* ================= ADMIN DELETE ================= */
  const deleteConfession = (id) => {
    const updated = confessions.filter(c => c.id !== id);
    setConfessions(updated);
    saveConfessions(updated);
  };

  /* ================= SORT ================= */
  let sorted = [...confessions];
  if (sortBy === "liked") {
    sorted.sort((a, b) => b.likes - a.likes);
  } else if (sortBy === "short") {
    sorted.sort((a, b) => a.message.length - b.message.length);
  } else {
    sorted.sort((a, b) => b.createdAt - a.createdAt);
  }

  /* ================= FILTER & SEARCH ================= */
  const filtered = sorted.filter(c => {
    const matchesFilter = filter === "All" || c.day === filter;
    const matchesSearch = c.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /* ================= CONFESSION OF THE DAY ================= */
  const today = new Date().toDateString();

  const confessionOfDay = filtered
    .filter(c => new Date(c.createdAt).toDateString() === today)
    .sort((a, b) =>
      b.likes !== a.likes
        ? b.likes - a.likes
        : b.createdAt - a.createdAt
    )[0];

  /* ================= INFINITE SCROLL ================= */
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = () => {
    setVisibleCount(v => v + 10);
  };

  /* ================= BACKGROUND HEARTS ================= */
  // Create randomized hearts for parallax
  const hearts = [...Array(15)].map((_, i) => ({
    id: i,
    left: Math.random() * 100 + "%",
    animationDuration: Math.random() * 10 + 10 + "s",
    animationDelay: Math.random() * 5 + "s"
  }));

  /* ================= RENDER HOME ================= */
  return (
    <div className="app">
      {/* Floating Background */}
      <div className="bg-hearts">
        {hearts.map(h => (
          <div
            key={h.id}
            className="bg-heart"
            style={{
              left: h.left,
              animationDuration: h.animationDuration,
              animationDelay: h.animationDelay
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <Header
        onWrite={() => setShowModal(true)}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />

      <AdminPanel refresh={refreshAdmin} />

      {/* Controls Row */}
      {/* Controls Row */}
      <div className="controls-row">
        {/* Search Bar */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search confessions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="liked">Most Liked</option>
          <option value="short">Short & Sweet</option>
        </select>
      </div>

      <FilterBar filter={filter} setFilter={setFilter} />

      {/* ===== CONFESSION OF THE DAY ===== */}
      {!search && confessionOfDay && filter === "All" && (
        <ConfessionCard
          confession={confessionOfDay}
          reactions={reactions[confessionOfDay.id] || {}}
          onLike={likeConfession}
          onReact={reactToConfession}
          onDelete={deleteConfession}
          admin={admin}
          highlight
        />
      )}

      {/* ===== MAIN LIST ===== */}
      <ConfessionList
        confessions={visible.filter(
          c => c.id !== confessionOfDay?.id || !!search || filter !== "All"
        )}
        reactions={reactions}
        onLike={likeConfession}
        onReact={reactToConfession}
        onDelete={deleteConfession}
        admin={admin}
        loadMore={loadMore}
        hasMore={hasMore}
      />

      {showModal && (
        <ConfessionModal
          onClose={() => setShowModal(false)}
          onSubmit={addConfession}
        />
      )}
    </div>
  );
}

/* =====================================================
   ROUTES
===================================================== */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/share/:id" element={<SharePage />} />
    </Routes>
  );
}
