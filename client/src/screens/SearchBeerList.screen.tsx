import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { theme } from "../theme";
import { fetchQuery } from "../services/apiService";
import { Beer } from "../types";
import { BeerItem } from "../components/BeerItem";





export const SearchBeerList: React.FC = ({route, navigation}: any) => {

  const {abv, ibu, color, food} = route.params;
  const [beers, setBeers] = useState<Beer[]>([]);


  useEffect(() => {
    let url = '/beers?';

    if (abv > 0) url += `abv_gt=${abv}`;
    if (ibu > 0) url += `&ibu_gt=${ibu}`;
    if (color.length) url += `&ebc_gt=${color[0]}&ebc_lt=${color[1]}`;
    if (food) url += `&food=${food}`;

    // console.warn({ abv, ibu, color, food })
    const query = async () => {
      const beersResult = await fetchQuery(url)
      if (beersResult) {
        setBeers(beersResult)
      } else {

      }
    };

    query();
    

  },[]);

  const navigateToBeer = (beer: Beer) => {
    navigation.navigate('Beer', beer)
  }

  return (
    <View style={styles.container}>
      {beers.length ? 
        <FlatList
          data={beers}
          // keyExtractor={item => item.bid}
          renderItem={({item}) => (
            <BeerItem beer={item} navigateToBeer={navigateToBeer}/>
          )}
        /> : 
        
        
        <Text>No beer sorry</Text>}
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: theme.bgDark,
    padding: theme.padding
  },
  img: { 
    width: 26, 
    height: 1,
    resizeMode: 'cover',
    overflow: 'visible',
  },
  beerItem: {
    marginTop: 20,
    height: 120,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.buttonColor,
    borderRadius: 10,
    justifyContent:'flex-start',
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',


  },
  beerName: {
    fontSize: 20,
    fontWeight: 'bold',

  }
});