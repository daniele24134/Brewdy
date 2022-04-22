import { beersParser } from "../utils";

const apiUrl = 'https://api.punkapi.com/v2';


export const fetchQuery = async (query: string) => {
  const url = apiUrl+query+'&per_page=20';
  try {
    const result = await fetch(url, {
      method: 'GET'
    })
  
    if (result.ok) {
      const data = await result.json()
      
      return beersParser(data);
    } else {
      return Promise.reject(result);
    }
    
  } catch (error: any) {
    console.log(JSON.parse(error));
  }
}

export const fetchRandom = async () => {
  const url = apiUrl + '/beers/random';

  try {
    const result = await fetch(url, {
      method: 'GET'
    });
  
    if (result.ok) {
      const data = await result.json()
  
      return beersParser(data)[0];
    } else {
      return Promise.reject(result);
    }
    
  } catch (error: any) {
    console.log(JSON.parse(error))
  }

}


