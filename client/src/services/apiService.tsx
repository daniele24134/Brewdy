import { Beer } from "../types";

const apiUrl = "https://api.punkapi.com/v2";

export const fetchQuery = async (query: string): Promise<Beer[]> => {
  const url = apiUrl + query + "&per_page=20";

  return fetch(url, {
    method: "GET",
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const fetchRandom = async () => {
  const url = apiUrl + "/beers/random";
  return fetch(url, {
    method: "GET",
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};
