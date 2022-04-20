import { beersParser } from "../utils";

const apiUrl = 'https://api.punkapi.com/v2';


export const fetchQuery = async (query: string) => {
  const url = apiUrl+query;



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

