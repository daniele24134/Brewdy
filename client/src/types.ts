
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

// export type User = {
//   username: string,
//   email:string,
//   beers: DbBeer[]
// }

export type UserData = {
  username: string,
  email: string,
  id: number,
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
  bid: number,
  userId: number,
  id: number
}

export type BeerForCreate = {
  name: string,
  tagline: string,
  image_url: string,
  abv: number,
  ibu: number,
  wish?:boolean
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