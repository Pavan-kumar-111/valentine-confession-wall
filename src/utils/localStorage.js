import { applyDailyReset } from "./dailyReset";

applyDailyReset();

const CONF = "confessions";
const REACT = "reactions";

export const getConfessions = () =>
  JSON.parse(localStorage.getItem(CONF)) || [];

export const saveConfessions = (data) =>
  localStorage.setItem(CONF, JSON.stringify(data));

export const getReactions = () =>
  JSON.parse(localStorage.getItem(REACT)) || {};

export const saveReactions = (data) =>
  localStorage.setItem(REACT, JSON.stringify(data));
