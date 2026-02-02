const words = ["fuck", "shit", "sex", "bitch"];

export const containsProfanity = (text) =>
  words.some(w => text.toLowerCase().includes(w));
