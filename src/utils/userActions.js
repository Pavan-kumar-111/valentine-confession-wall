const KEY = "user_actions";

const getData = () =>
  JSON.parse(localStorage.getItem(KEY)) || {
    likes: {},
    reactions: {}
  };

const saveData = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));

export const hasLiked = (id) => {
  const data = getData();
  return !!data.likes[id];
};

export const markLiked = (id) => {
  const data = getData();
  data.likes[id] = true;
  saveData(data);
};

export const hasReacted = (id, emoji) => {
  const data = getData();
  return data.reactions[id]?.includes(emoji);
};

export const markReacted = (id, emoji) => {
  const data = getData();
  data.reactions[id] = data.reactions[id] || [];
  data.reactions[id].push(emoji);
  saveData(data);
};
