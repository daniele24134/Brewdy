import { BeerForCreate, Comment, Credentials, DbBeer, UserData } from "../types";


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
    if (res.ok) {
      return res.json()
    } else return Promise.reject(res);
  })
  
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
    .then(res => {
      if (res.ok) {
        return res.json()
      } else return Promise.reject(res);
    })
}

export const fetchUser = async (id: number): Promise<UserData> => {
  return fetch(url + `/users/${id}`)
  .then(res => {
    return Promise.reject(res);
  })
}

export const addBeer = async (beer: BeerForCreate, userId: number) => {

  return fetch(url+`/beers/${userId}`, {
    method: 'POST',
    body: JSON.stringify(beer),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else return Promise.reject(res);
  })
}


export const getBeerByBid = async (bid: number): Promise<DbBeer>  => {
  return fetch(url + `/beers/${bid}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}


export const incrementCounter = async (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/increment/${beerId}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

export const decrementCounter = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/decrement/${beerId}`)
  .then(res => {
    if (res.status < 400) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

export const removeBeer = (beerId: number): Promise<DbBeer> => {
  return fetch(url + `/beers/${beerId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

export const toggleWish = (beerId: number):Promise<DbBeer> => {
  return fetch(url + `/beers/toggleWish/${beerId}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

export const getComments = (beerId: number):Promise<Comment[]> => {
  return fetch(url+`/comments/${beerId}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
}

export const createComment = (body: any):Promise<Comment> => {
  return fetch(url+ '/comments', {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

