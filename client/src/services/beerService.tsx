import { BeerForCreate, DbBeer } from "../types";

const url = "http://localhost:3003";

export const beerServiceAddBeer = async (beer: BeerForCreate, userId: number) => {
  return fetch(url + `/beers/${userId}`, {
    method: "POST",
    body: JSON.stringify(beer),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(res);
  });
};

export const beerServiceGetBeerByBid = async (bid: number): Promise<DbBeer> => {
  return fetch(url + `/beers/${bid}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const beerServiceIncrementCounter = async (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/increment/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const beerServiceDecrementCounter = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/decrement/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const beerServiceRemoveBeer = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/${beerId}`, {
    method: "DELETE",
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const beerServiceToggleWish = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/toggleWish/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

