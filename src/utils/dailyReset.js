const KEY = "last_reset";

export const applyDailyReset = () => {
  const today = new Date().toDateString();
  const last = localStorage.getItem(KEY);

  if (today !== last) {
    localStorage.removeItem("confessions");
    localStorage.removeItem("reactions");
    localStorage.setItem(KEY, today);
  }
};
