
export type Beer = {
  bid: number,
  name: string,
  tagline: string,
  description:string,
  image_url: string,
  abv: number,
  ibu: number,
  ebc: number,
  ingredients: Ingredients,

  food_pairing: string[]
}

export type User = {
  username: string,
  email:string,
  beers: DbBeer[]
}

export type DbBeer = {
  name:string,
  counter: number,
  tagline: string,
  wish: boolean,
  image_url: string,
  abv: number,
  ibu: number,
  ebc: number,
  userId: number,
}


export type Ingredients = {
  malt: Malt[],
  hops: Hop[],
  yeast: string,
}

export type Malt =  {
  name: string,
  amount : {
    value: number,
    unit: string
  }
}

export type Hop = {
  name: string,
  amount: {
    value: number,
    unit: string
  },
  add: string,
  attribute: string
}


export type Credentials = {
  email: string,
  password: string
}

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  version?: string;
  expires?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export interface Cookies {
  [key: string]: Cookie;
}