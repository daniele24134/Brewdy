import React from "react";
import { StyleSheet, Text, View, Image,ScrollView } from "react-native";
import { IngredientList } from "../components/Ingredient";
import {theme} from '../theme';
import { Beer } from "../types";




export const BeerDetail:React.FC = ({route}: any) => {
  const beer: Beer = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailHeader}>
        <Image style={styles.img} source={{ uri: beer.image_url }}></Image>

        <View style={{width: 220}}>
          <Text style={[styles.beerName,styles.textColor]}>{beer.name}</Text>
          <Text style={[styles.beerTagline, styles.textColor]}>{beer.tagline}</Text>

          <View style={styles.info}>

            <View style={{marginRight:20}}>
              <Text style={[styles.textColor]}>ABV</Text>
              <Text style={[styles.textColor]}>{beer.abv}</Text>
            </View>

            <View style={{marginRight:20}}>
              <Text style={[styles.textColor]}>IBU</Text>
              <Text style={[styles.textColor]}>{beer.ibu}</Text>
            </View>

          </View>
        </View>

      </View>
      <View style={styles.description}>
        <Text style={[styles.textColor]}>{beer.description}</Text>
      </View>
      <View style={styles.ingredientsList}>
        {Object.keys(beer.ingredients).map(title => (
          <IngredientList key={title} 
            ingredients={beer.ingredients}
            title={title}
          />
        ))}

      </View>
      <Text style={[styles.foodTitle]}>Food Pairing</Text>
      <Text style={[styles.textColor,{marginBottom: 100}]}>{beer.food_pairing.join(', ')}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding
  },
  img: {
    width: 70,
    height: 200,
    resizeMode: 'cover',
    overflow: 'visible',
  },
  detailHeader: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    height: '30%',
    justifyContent: 'space-between'
  },
  info: {
    flexDirection:'row',
    marginTop: 30
  },
  beerName: {
    fontSize: 30,
    fontWeight: '700',
  },
  beerTagline: {
    fontSize: 18,
  },
  textColor: {
    color:theme.textDark
  },
  description: {
    marginTop:65
  },
  ingredientsList:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:30,
    marginBottom: 50,
  },
  foodTitle:{
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: theme.buttonColor
  }
});