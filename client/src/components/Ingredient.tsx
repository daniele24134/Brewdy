import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { theme } from "../theme";
import { Hop, Ingredients, Malt } from "../types";
import {onlyUnique} from '../utils';

type IngredientListProps = {
  title:string,
  ingredients: Ingredients
}

export const IngredientList: React.FC<IngredientListProps> = ({ingredients, title}: IngredientListProps) => {
  let ing: Malt[] | Hop[] | string;

  switch(title){
    case 'malt':
      ing = ingredients.malt;
      break;
    case 'hops':
      ing = ingredients.hops;
      break;
    case 'yeast':
      ing = ingredients.yeast;
      break;
    default: ing = [];
  }


  return (
  <View style={styles.ingContainer}>
    <Text style={styles.ingTitle}>{title}</Text>
    {
      Array.isArray(ing) ?

      ing.map(it=> it.name).filter(onlyUnique).map((item, i) => (
        <View key={i} style={styles.dotContainer}>
          <View style={styles.dot}></View>
          <Text style={styles.text}>
            {item}
          </Text>
        </View>
      )) :

      <View style={styles.dotContainer}>
        <View style={styles.dot}></View>
        <Text style={styles.text}>{ing}</Text>
      </View>
    }
  </View>
  );

}

const styles = StyleSheet.create({
  ingContainer:{
    width: '30%',
    alignItems: 'center'
  },
  ingTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: theme.buttonColor,
  },
  text: {
    color: theme.textDark,
    justifyContent:'center',
    margin:1
  },
  dot: {
    width: 5,
    height:5,
    borderRadius:7,
    backgroundColor: theme.buttonColor,
    marginRight:3
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});
