const url = "http://localhost:3003";

export const taggingServiceCreateTagging = (beerId: number, pubId: number) => {
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

export const taggingServiceDeleteTagging = (beerId: number, pubId: number) => {
  return fetch(url + `/taggings/beers/${beerId}/pubs/${pubId}`, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}
