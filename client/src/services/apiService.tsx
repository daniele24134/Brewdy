import { beersParser } from "../utils";
import { Beer } from "../types";

const apiUrl = 'https://api.punkapi.com/v2';


export const fetchQuery = async (query: string): Promise<Beer[]> => {
  const url = apiUrl+query+'&per_page=20';

  return fetch(url, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }else {
      return Promise.reject(res);
    }
  });   
}

export const fetchRandom = async () => {
  const url = apiUrl + '/beers/random';
  return fetch(url, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });



  // try {
  //   const result = await fetch(url, {
  //     method: 'GET'
  //   });
  
  //   if (result.ok) {
  //     const data = await result.json()
  
  //     return beersParser(data)[0];
  //   } else {
  //     return Promise.reject(result);
  //   }
    
  // } catch (error: any) {
  //   console.log(JSON.parse(error))
  // }

}


