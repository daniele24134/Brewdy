import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { BeerSectionItem } from "../components/BeerSectionItem";
import { decrementCounter, incrementCounter, removeBeer, toggleWish } from "../services/backService";
import { theme } from "../theme";
import { DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { wishBeers, sectionBeers} from "../utils";
import { WishBeerSectionItem } from "../components/WishBeerSectionItem";

export const WishList: React.FC = () => {

  const { user, updateUser } = useUserContext();

  const [beers, setBeers] = useState(user!.beers);
  const [sectionData, setSectionData] = useState(sectionBeers(wishBeers(beers)));

  const toggle = async (beerId: number) => {
    const updatedBeer = await toggleWish(beerId);

    

    if (updatedBeer){
      const filteredBeers = beers.filter(b => b.id !== updatedBeer.id);
      updateUser({
        ...user!,
        beers: filteredBeers
      });
    }

  }
  

  useEffect(() => {
    setSectionData(sectionBeers(wishBeers(beers)));
  }, [beers]);

  useEffect(() => {
    setBeers(user!.beers);
  }, [user])



  return (
    <View style={styles.container}>
      {wishBeers(beers).length ?
        <SectionList
          sections={sectionData}
          // stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          renderItem={({ item }) => <WishBeerSectionItem toggle={toggle} item={item}/>}
          keyExtractor={(item) => String(item!.bid)}
        /> :
        <View style={{ marginTop: '50%' }}>
          <Text style={styles.textNobeer}>No beer in the wish list yet.</Text>
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



