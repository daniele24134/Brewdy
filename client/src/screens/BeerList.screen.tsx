import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { BeerSectionItem } from "../components/BeerSectionItem";
import { decrementCounter, incrementCounter, removeBeer } from "../services/backService";
import { theme } from "../theme";
import { DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { beersDrunk, sectionBeers } from "../utils";

export const BeerList:React.FC = () => {

  const {user, updateUser} = useUserContext();
 
  const [beers, setBeers] = useState(user!.beers);
  const [sectionData, setSectionData] = useState(sectionBeers(beersDrunk(beers)));

  const increment = async(id: number) => {
    const newBeer = await incrementCounter(id);
    if (newBeer) {
      const newBeers = beers.map(b => {
          if (b.id === newBeer.id) return newBeer;
          else return b;
        });

      updateUser({
        ...user!,
        beers: newBeers
      });
    }
  }

  useEffect(()=>{
    setSectionData(sectionBeers(beersDrunk(beers)));
  },[beers]);

  useEffect(()=> {
    setBeers(user!.beers);
  }, [user])

  const decrement = async(id: number, counter: number) => {
    if (counter > 1) {
      const newBeer = await decrementCounter(id);
      if (newBeer) {
        const newBeers = beers.map(b => {
          if (b.id === newBeer.id) return newBeer;
          else return b;
        });

        updateUser({
          ...user!,
          beers: newBeers
        });
      }

    } else {
      const removedBeer = await removeBeer(id);
      if (removedBeer) {
        const newBeers = beers.filter(b => b.id !== removedBeer.id);
        updateUser({
          ...user!,
          beers: newBeers
        });
      }
    }
  }


  return (
    <View style={styles.container}>
      {beersDrunk(beers).length ? 
      <SectionList
        sections={sectionData}
        // stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        renderItem={({ item }) => <BeerSectionItem decrement={decrement} increment={increment} item={item} />}
        keyExtractor={(item) => String(item!.bid)}
      /> : 
      <View style={{marginTop:'50%'}}>
        <Text style={styles.textNobeer}>No beer in the beer list yet.</Text>
        <Text style={styles.textNobeer}>Start searching for a beer.</Text>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
  },
  sectionHeader: {
    padding: 15,
    color: theme.textDark,
    backgroundColor: theme.bgDark,
    borderWidth: 1,
    fontWeight: '700',
    fontSize: 16
  },
  textNobeer: {
    color: theme.textDark,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10
  }
});




