import { Beer } from "../types";

const apiUrl = "https://api.punkapi.com/v2";

export const fetchQuery = async (query: string): Promise<Beer[]> => {
  const randomPage =  query === "/beers?" ? 
  Math.floor(Math.random() * 13) + 1 : '1';
  
  const url = apiUrl + query + `&per_page=20&page=${randomPage}`;

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
