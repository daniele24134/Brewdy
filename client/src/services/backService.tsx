import { BeerForCreate, Credentials, DbBeer, UserData } from "../types";


const url = 'http://localhost:3003';


type UserBody = {
  username: string,
  email: string, 
  password:string
}

export const createUser = async (user: UserBody) => {

  const result = await fetch(url + '/users/create', {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  });
  
  if (result.ok) {
    return await result.json();
  } else return;

}

export const fetchLogin = async (credentials: Credentials) => {

  const result = await fetch(url+'/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (result.ok) {
    return await result.json();
  }else return;
}

export const fetchUser = async (id: number): Promise<UserData | undefined> => {
  const result = await fetch(url+`/users/${id}`);

  if (result.ok) {
    return result.json();
  }else return;
}

export const addBeer = async (beer: BeerForCreate, userId: number) => {
  const result = await fetch(url+`/beers/${userId}`, {
    method: 'POST',
    body: JSON.stringify(beer),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (result.ok) return await result.json();
  else return
}

export const incrementCounter = async (beerId: number): Promise<DbBeer | undefined> => {
  const result = await fetch(url +`/beers/increment/${beerId}`);

  if (result.ok) return await result.json();
  else return;
}
export const decrementCounter = async (beerId: number): Promise<DbBeer | undefined> => {
  const result = await fetch(url + `/beers/decrement/${beerId}`);

  if (result.ok) return await result.json();
  else return;
}

export const removeBeer = async (beerId: number):Promise<DbBeer | undefined> => {
  const result = await fetch(url + `/beers/${beerId}`, {
    method: 'DELETE'
  });
  if (result.ok) return await result.json();
  else return;
}