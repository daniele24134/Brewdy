import { Credentials, User } from "../types";


const url = 'http://localhost:3003';

export const fetchUser = async (): Promise<User | undefined> => {
  try {
    const result = await fetch(url+'/users', {
      credentials: 'include'
    });
    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

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
