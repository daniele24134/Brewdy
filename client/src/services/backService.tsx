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
  }).then(result => {
    return result.json();
  })
  .then(data => {
    return data;
  })
  .catch(e => {
    console.warn(e);
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
  })
  .then(result => result.json())
  .then(data => data)
  .catch(e => console.warn(e));
}

export const fetchUser = async (id: number): Promise<UserData | undefined> => {
  return fetch(url+`/users/${id}`)
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
} // TODO maybe remove

export const addBeer = async (beer: BeerForCreate, userId: number) => {

  return fetch(url+`/beers/${userId}`, {
    method: 'POST',
    body: JSON.stringify(beer),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
}


export const getBeerByBid = async (bid: number): Promise<DbBeer | undefined>  => {
  return fetch(url + `/beers/${bid}`)
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
}



export const incrementCounter = async (beerId: number): Promise<DbBeer | undefined> => {
  return fetch(url +`/beers/increment/${beerId}`)
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
}

export const decrementCounter = async (beerId: number): Promise<DbBeer | undefined> => {
  return fetch(url + `/beers/decrement/${beerId}`)
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
}

export const removeBeer = async (beerId: number):Promise<DbBeer | undefined> => {
  return fetch(url + `/beers/${beerId}`, {
    method: 'DELETE'
  })
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
}

export const toggleWish = async (beerId: number):Promise<DbBeer | undefined> => {
  return fetch(url+`/beers/toggleWish/${beerId}`)
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.warn(e));
}