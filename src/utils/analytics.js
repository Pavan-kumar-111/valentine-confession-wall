const KEY = "heatmap";

export const trackActivity = () => {
  const h = new Date().getHours();
  const data = JSON.parse(localStorage.getItem(KEY)) || {};
  data[h] = (data[h] || 0) + 1;
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const getHeatmap = () =>
  JSON.parse(localStorage.getItem(KEY)) || {};
