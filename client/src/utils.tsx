
import { Beer, DbBeer } from "./types"

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

export const beerParser = (beer: Beer) => {
  return {
    name: beer.name,
    tagline: beer.tagline,
    image_url: beer.image_url,
    abv: beer.abv,
    ibu: beer.ibu,
    bid: beer.bid
  }
}

export function onlyUnique(value:any, index:number, self: any[]) {
  return self.indexOf(value) === index;
}

export function beersDrunk (beers: DbBeer[]) {
  return beers.filter(b => !b.wish);
}

export function wishBeers(beers: DbBeer[]) {
  return beers.filter(b => b.wish);
}

type SectionBeer = {
  title: string,
  data: DbBeer[]
}



export function sectionBeers (beers: DbBeer[]):SectionBeer[]  {
  let result: SectionBeer[] = [];
  const titles = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Others"];
  for(let t of titles) {
    const data: DbBeer[] = [];
    let section: SectionBeer = {title: '', data: []}
    beers.forEach(b => {
      const title = b!.name[0];
      if (t === 'Others' && !titles.includes(title)) data.push(b);
      if (title === t) data.push(b);
      section = {title: t, data: data}
    })
    result.push(section);
  }
  return result.filter(section => section.data.length > 0);
}