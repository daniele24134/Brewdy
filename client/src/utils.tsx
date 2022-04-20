import { Beer } from "./types"

// export type Beer = {
//   id: number,
//   name: string,
//   tagline: string,
//   description: string,
//   image_url: string,
//   abv: number,
//   ibu: number,
//   ebc: number,
//   ingredients: {
//     malt: Malt[],
//     hops: Hop[]
//   },
//   food_pairing: string[]
// }



export const beersParser = (beers: any): Beer[] => {
  return beers.map((b:any)  => {
    return {
      bid: b.id,
      name: b.name,
      tagline: b.tagline,
      description: b.description,
      image_url: b.image_url,
      abv: b.abv,
      ibu: b.ibu,
      ebc: b.ebc,
      ingredients: b.ingredients,
      food_pairing: b.food_pairing
    }
  })
}

export function onlyUnique(value:any, index:number, self: any[]) {
  return self.indexOf(value) === index;

}