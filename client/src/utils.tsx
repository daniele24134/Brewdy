import { groupBy } from "lodash";
import { theme } from "./theme";
import { Beer, DbBeer, UserData } from "./types";

const ebc = {
  yellow: [0, 12],
  orange: [13, 30],
  brown: [31, 47],
  black: [48, 79],
};

export const beersParser = (beers: any): Beer[] => {
  return beers.map((b: any) => {
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
      food_pairing: b.food_pairing,
    };
  });
};

export const beerParser = (beer: Beer) => {
  return {
    name: beer.name,
    tagline: beer.tagline,
    image_url: beer.image_url,
    abv: beer.abv,
    ibu: beer.ibu,
    bid: beer.bid,
    ebc: beer.ebc,
  };
};

export function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

export function beersDrunk(beers: DbBeer[]) {
  return beers.filter(b => !b.wish);
}

export function wishBeers(beers: DbBeer[]) {
  return beers.filter(b => b.wish);
}

type SectionBeer = {
  title: string;
  data: DbBeer[];
};

export function sectionBeers(beers: DbBeer[]): SectionBeer[] {
  let result: SectionBeer[] = [];
  const titles = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Others",
  ];

  for (let t of titles) {
    const data: DbBeer[] = [];
    let section: SectionBeer = { title: "", data: [] };
    beers.forEach(b => {
      const title = b!.name[0];
      if (t === "Others" && !titles.includes(title)) data.push(b);
      if (title === t) data.push(b);
      section = { title: t, data: data };
    });
    result.push(section);
  }
  return result.filter(section => section.data.length > 0);
}

export const getAbv = (beer: DbBeer) => Math.floor(beer.abv);

export const getEbc = (beers: DbBeer[]) => {
  const colorSchema = {
    "#FDC426": 0,
    "#D0752C": 0,
    "#812613": 0,
    "#290D0E": 0,
  }
  for (let beer of beers) {
    let keyColor = Number(beer.ebc);
    if (keyColor <= ebc.yellow[1]) {
      colorSchema["#FDC426"]++;
    } else if (keyColor > ebc.orange[0] && keyColor <= ebc.orange[1]) {
      colorSchema["#D0752C"]++;
    } else if (keyColor > ebc.brown[0] && keyColor <= ebc.brown[1]) {
      colorSchema["#812613"]++;
    } else if (keyColor > ebc.black[0]) {
      colorSchema["#290D0E"]++;
    }
  }
  return colorSchema;
};

export const getPercent = (user: UserData) => {
  return (100 * beersDrunk(user!.beers).length) / 325;
};

export const getData = (percent: number) => {
  return [
    { x: percent, y: percent },
    { x: 0, y: 100 - percent },
  ];
};

export const filterBeer = (beers: SectionBeer[], searchTerm: string) => {
  return beers.map(section => {
    return ({ ...section, data: section.data.filter(b => (
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )})
  }).filter(section => section.data.length > 0);
}

export const getEbcData = (beers: DbBeer[]) => {

  const beerSchema = getEbc(beers);
  const data = Object.entries(beerSchema).map(
    (val) => {
      return ({
        x: val[1],
        y: val[1],
      });
    }
  );
  return data;
};




