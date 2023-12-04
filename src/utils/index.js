const wait = (time = 500) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const utils = {
  wait,
};
