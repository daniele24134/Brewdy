import { Pub } from "../types";

const url = "http://localhost:3003";

export const pubServiceGetPubs = (userId: number): Promise<Pub[]> => {
  return fetch(url + `/users/${userId}/pubs`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

export const pubServiceGetPub = (pubId: number): Promise<Pub> => {
  return fetch(url + `/pubs/${pubId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const pubServiceCreatePub = (
  name: string,
  city: string,
  address: string,
  userId: number,
): Promise<Pub> => {
  return fetch(url + `/pubs`, {
    method: 'POST',
    body: JSON.stringify({ name, city, address, userId }),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const pubServiceDeletePub = (pubId: number): Promise<Pub> => {
  return fetch(url + `/pubs/${pubId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}
