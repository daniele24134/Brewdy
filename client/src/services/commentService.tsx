import { Comment } from "../types";

const url = "http://localhost:3003";

export const commentServiceGetComments = (beerId: number): Promise<Comment[]> => {
  return fetch(url + `/comments/${beerId}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const commentServiceCreateComment = (body: any): Promise<Comment> => {
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

export const commentServiceDeleteComment = (id: number, userId: number): Promise<Comment> => {
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