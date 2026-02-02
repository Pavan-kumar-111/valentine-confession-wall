export const createObserver = (cb) =>
  new IntersectionObserver(e => e[0].isIntersecting && cb(), {
    threshold: 1
  });
