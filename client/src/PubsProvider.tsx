import React, { createContext, useEffect, useState } from "react";
import { getPubs } from "./services/backService";
import { Pub } from "./types";

type PubContextType = {
  pubs: Pub[],
  addPub: (pub: Pub) => void,
  getAllPubs: (userId: number) => void,
  removePub: (id: number) => void
}

const PubsContext = createContext<PubContextType>({
  pubs: [],
  addPub: (pub: Pub) => {},
  getAllPubs: (userId: number) => {},
  removePub: (id: number) => {}
});

export const PubsProvider: React.FC = ({ children }) => {

  const [pubs, setPubs] = useState<Pub[]>([]);


  const getAllPubs = (userId: number) => {
    getPubs(userId).then(
      data => {
        setPubs(data);
      },
      (_e: any) => console.log(_e)
    )
  }

  const addPub = (pub: Pub) => {
    setPubs([...pubs, pub]);
  }

  const removePub = (id: number) => {
    setPubs(prev => {
      return prev.filter( p => p.id !== id);
    });
  };


  return (
    <PubsContext.Provider value={{ pubs: pubs, addPub, getAllPubs, removePub }}>
      {children}
    </PubsContext.Provider>
  );
}

export const usePubsContext = () => React.useContext(PubsContext);