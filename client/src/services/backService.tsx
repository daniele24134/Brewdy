import { Credentials, User } from "../types";


const url = 'http://localhost:3003';

export const fetchUser = async (): Promise<User | undefined> => {
  try {
    const result = await fetch(url+'/users', {
      credentials: 'include'
    });
    if (result.ok) {
      const data = await result.json();
      console.warn('I AM HERE', data)
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
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

  return result.ok;
}
