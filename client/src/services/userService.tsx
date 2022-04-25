import {
  Credentials,
  UserData,
} from "../types";

const url = "http://localhost:3003";

type UserBody = {
  username: string;
  email: string;
  password: string;
};

const userServiceCreateUser = async (user: UserBody) => {
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

const userServiceFetchLogin = async (credentials: Credentials) => {
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

const userServiceFetchUser = async (id: number): Promise<UserData> => {
  return fetch(url + `/users/${id}`).then(res => {
    return Promise.reject(res);
  });
};

export { userServiceFetchLogin, userServiceFetchUser, userServiceCreateUser };