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
      setBeers((prev) => {
        return prev.map(b => {
          if (b.id === newBeer.id) return newBeer;
          else return b;
        });
      })
    }
  }

  useEffect(()=>{
    setSectionData(sectionBeers(beersDrunk(beers)));
    const newUser = {...user!, beers: beers}

    updateUser(newUser);
  },[beers])

  const decrement = async(id: number, counter: number) => {
    if (counter > 1) {
      const newBeer = await decrementCounter(id);
      if (newBeer) {
        setBeers((prev) => {
          return prev.map(b => {
            if (b.id === newBeer.id) return newBeer;
            else return b;
          });
        })
      }

    } else {
      const removedBeer = await removeBeer(id);
      if (removedBeer) {
        setBeers((prev) => {
          return prev.filter(b => b.id !== removedBeer.id);
        })
      }

    }
  }


  return (
    <View style={styles.container}>

      <SectionList
        sections={sectionData}
        // stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        renderItem={({ item }) => <BeerSectionItem decrement={decrement} increment={increment} item={item} />}
        keyExtractor={(item) => String(item!.bid)}
      />
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
});




