import {
  BeerForCreate,
  Comment,
  Credentials,
  DbBeer,
  Pub,
  UserData,
} from "../types";
// import { PORT } from 'react-native-dotenv';

const url = "http://localhost:3003";

type UserBody = {
  username: string;
  email: string;
  password: string;
};

export const createUser = async (user: UserBody) => {
  return fetch(url + "/users/create", {
    method: "POST",
    body: JSON.stringify(user),
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

export const fetchLogin = async (credentials: Credentials) => {
  return fetch(url + "/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
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

export const fetchUser = async (id: number): Promise<UserData> => {
  return fetch(url + `/users/${id}`).then(res => {
    return Promise.reject(res);
  });
};

export const addBeer = async (beer: BeerForCreate, userId: number) => {
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

export const getBeerByBid = async (bid: number): Promise<DbBeer> => {
  return fetch(url + `/beers/${bid}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const incrementCounter = async (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/increment/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const decrementCounter = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/decrement/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const removeBeer = (beerId: number): Promise<DbBeer> => {
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

export const toggleWish = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/toggleWish/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const getComments = (beerId: number): Promise<Comment[]> => {
  return fetch(url + `/comments/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const createComment = (body: any): Promise<Comment> => {
  return fetch(url + "/comments", {
    method: "POST",
    body: JSON.stringify(body),
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

export const deleteComment = (id: number, userId: number): Promise<Comment> => {
  return fetch(url + `/comments/${id}/users/${userId}`, {
    method: "DELETE",
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const getPubs = (userId: number): Promise<Pub[]> => {
  return fetch(url + `/users/${userId}/pubs`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

export const getPub = (pubId: number): Promise<Pub> => {
  return fetch(url + `/pubs/${pubId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const createPub = (
    name: string, 
    city: string, 
    address: string, 
    userId: number, 
  ): Promise<Pub> => {
  return fetch(url + `/pubs`, {
    method: 'POST',
    body: JSON.stringify({name, city, address, userId}),
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

export const deletePub = (pubId: number): Promise<Pub> => {
  return fetch(url + `/pubs/${pubId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

export const createTagging = (beerId: number, pubId: number) => {
  return fetch(url + '/taggings', {
    method: 'POST',
    body: JSON.stringify({ BeerId: beerId, PubId: pubId }),
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
