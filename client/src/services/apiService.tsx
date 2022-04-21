import { beersParser } from "../utils";

const apiUrl = 'https://api.punkapi.com/v2';


export const fetchQuery = async (query: string) => {
  const url = apiUrl+query+'&per_page=20';



  const result = await fetch(url, {
    method: 'GET'
  });

  if (result.ok) {
    const data = await result.json()
    
    return beersParser(data);
  } else {
    return false;
  }
}

export const fetchRandom = async () => {
  const url = apiUrl + '/beers/random';
  const result = await fetch(url, {
    method: 'GET'
  });

  if (result.ok) {
    const data = await result.json()

    return beersParser(data)[0];
  } else {
    return false;
  }
}


