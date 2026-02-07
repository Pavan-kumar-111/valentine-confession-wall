import { useEffect, useState } from "react";

export default function Header({ onWrite, darkMode, toggleTheme }) {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShrink(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header className={`header sticky-header ${shrink ? "shrink" : ""}`}>
      <div className="header-brand" onClick={scrollToTop}>
        <img
          src="/logo.png"
          alt="Confession Logo"
          className="header-logo"
        />
        <h1>Anonymous Valentine Confession Wall</h1>
      </div>

      <p className="header-tagline">
        Say it anonymously. Feel it honestly.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button className="primary-btn" onClick={onWrite}>
          💌 Write a Confession
        </button>
        <button
          className="secondary-btn"
          onClick={toggleTheme}
          style={{ fontSize: '18px', padding: '10px 14px' }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
