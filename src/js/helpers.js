import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPRO = fetch(url);
    const result = await Promise.race([fetchPRO, timeout(TIMEOUT_SEC)]);
    const data = await result.json();

    if (!result.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};
