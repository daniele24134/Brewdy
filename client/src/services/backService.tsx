import { BeerForCreate, Credentials, DbBeer, UserData } from "../types";


const url = 'http://localhost:3003';


type UserBody = {
  username: string,
  email: string, 
  password:string
}

export const createUser = async (user: UserBody) => {
 return fetch(url + '/users/create', {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
  .then(result => {
    return result.json();
  })
  .then(data => {
    return data;
  })
  .catch(e => {
    console.log(JSON.parse(e));
  });
}

export const fetchLogin = async (credentials: Credentials) => {

  return fetch(url+'/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
  .then(result => result.json())
  .then(data => data)
  .catch(e => console.log(JSON.parse(e)));
}

export const fetchUser = async (id: number): Promise<UserData | undefined> => {
  return fetch(url + `/users/${id}`)
  .then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
} // TODO maybe remove

export const addBeer = async (beer: BeerForCreate, userId: number) => {

  return fetch(url+`/beers/${userId}`, {
    method: 'POST',
    body: JSON.stringify(beer),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
}


export const getBeerByBid = async (bid: number): Promise<DbBeer | undefined>  => {
  return fetch(url + `/beers/${bid}`)
  .then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
}


export const incrementCounter = async (beerId: number): Promise<DbBeer | undefined> => {
  return fetch(url + `/beers/increment/${beerId}`)
  .then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
}

export const decrementCounter = async (beerId: number): Promise<DbBeer | undefined> => {
  return fetch(url + `/beers/decrement/${beerId}`)
  .then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
}

export const removeBeer = async (beerId: number):Promise<DbBeer | undefined> => {
  return fetch(url + `/beers/${beerId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
}

export const toggleWish = async (beerId: number):Promise<DbBeer | undefined> => {
  return fetch(url + `/beers/toggleWish/${beerId}`)
  .then(res => {
    if (res.status < 400) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(JSON.parse(e)));
}