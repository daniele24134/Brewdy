import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { theme } from "../theme";
import { DbBeer } from "../types";

type BeerSectionProps = {
  item: DbBeer
}

export const WishBeerSectionItem: React.FC<BeerSectionProps> = ({ item }) => {

  const [open, setOpen] = React.useState(false);


  return (
    <>{
      open ?
        <Pressable onPress={() => setOpen(prev => !prev)} style={[styles.sectionItemOpen]}>
          <Image style={styles.img} source={{ uri: item.image_url }}></Image>
          <Text style={styles.sectionTextOpen}>{item.name} {item.abv}%</Text>
          <View style={styles.counter}>

            

          </View>
        </Pressable> :
        <Pressable onPress={() => setOpen(prev => !prev)}>
          <Text style={styles.sectionItem}>{item.name}</Text>
        </Pressable>
    }</>
  );
}


const styles = StyleSheet.create({
  sectionItem: {
    padding: 15,
    backgroundColor: theme.bgLight,
    fontSize: 16,

    marginBottom: 1
  },
  sectionItemOpen: {
    width: '100%',
    height: 100,
    backgroundColor: theme.bgLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1
  },
  sectionTextOpen: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '600',
    width: '60%'
  },
  img: {
    width: 20,
    height: 70,
    marginLeft: 10
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
    justifyContent: 'space-between',
    width: 80
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decCounter: {
    backgroundColor: 'pink'
  },
  incCounter: {
    backgroundColor: theme.buttonColor
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: '600'
  }
})