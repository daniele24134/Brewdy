import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SectionList, Alert, LayoutAnimation } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BeerSectionItem } from "../components/BeerSectionItem";
import { decrementCounter, incrementCounter, removeBeer } from "../services/backService";
import { theme, global } from "../theme";
import { DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { beersDrunk, filterBeer, sectionBeers } from "../utils";

export const BeerList:React.FC = ({ navigation, route }: any) => {

  const {user, updateUser} = useUserContext();
 
  const [beers, setBeers] = useState(user!.beers);
  const [sectionData, setSectionData] = useState(sectionBeers(beersDrunk(beers)));
  const [searchTerm, setSearchTerm] = useState('');

  const handleForm = (id: number) => {
    navigation.navigate('PubForm', {beerId: id});
  }
  
  useEffect(()=>{
    setSectionData(sectionBeers(beersDrunk(beers)));
  },[beers]);

  useEffect(()=> {
    setBeers(user!.beers);
  }, [user]);

  useEffect(() => {
    setSectionData(filterBeer(
        sectionBeers(beersDrunk(beers)), searchTerm
      )
    );
  }, [searchTerm]);

  const increment = async (id: number) => {
    incrementCounter(id).then(
      (data: DbBeer) => {
        if (data) {
          const newBeers = beers.map(b => {
            if (b.id === data!.id) return data;
            else return b;
          });

          updateUser({ ...user!, beers: newBeers });
        }
      },
      (e: any) => { Alert.alert('Not incremented correctly') }
    )
  };

  const decrement = async (id: number, counter: number) => {
    if (counter > 1) {
      decrementCounter(id).then(
        (data: DbBeer) => {
          if (data) {
            const newBeers = beers.map(b => {
              if (b.id === data!.id) return data;
              else return b;
            });

            updateUser({ ...user!, beers: newBeers });
          }
        },
        (e: any) => { Alert.alert('Not decremented correctly') }
      )

    } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        removeBeer(id).then(
        (data: DbBeer) => {
          const newBeers = beers.filter(b => b.id !== data.id);
          updateUser({ ...user!, beers: newBeers });
        },
        (e: any) => {Alert.alert('Not removed correctly')}
      )

    }
  }

  return (
    <View style={styles.container}>

      <TextInput 
        style={styles.searchInput}
        placeholder='Search ...'
        placeholderTextColor='#ccc'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {beersDrunk(beers).length ? 
      <SectionList
        sections={sectionData}
        // stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionHeader, global.bold]}>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) =>(
          <BeerSectionItem decrement={decrement} increment={increment} item={item} handleForm={handleForm}/>
        )}
        keyExtractor={(item) => String(item!.bid)}
      /> : 
      <View style={{marginTop:'50%'}}>
        <Text style={[styles.textNobeer, global.bold]}>No beer in the beer list yet.</Text>
        <Text style={[styles.textNobeer, global.bold]}>Start searching for a beer.</Text>
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
    fontSize: 16,
  },
  textNobeer: {
    color: theme.textDark,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: theme.buttonColor,
    fontSize: 20,
    paddingHorizontal: 20
  },
});




