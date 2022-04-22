import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { theme } from "../theme";
import { DbBeer } from "../types";
import { EmptyBeer, FullBeer } from "./Icons";

type BeerSectionProps = {
  item: DbBeer,
  toggle: (beerId:number) => void
}

export const WishBeerSectionItem: React.FC<BeerSectionProps> = ({ item, toggle }) => {

  const [open, setOpen] = React.useState(false);
  const [wish, setWish] = React.useState(true);


  const toggleBeer = () => {
    setWish(prev => !prev);
    setTimeout(() => {toggle(item.id);}, 500);
    
  }

  return (
    <>{
      open ?
        <Pressable onPress={() => setOpen(prev => !prev)} style={[styles.sectionItemOpen]}>
          <Image style={styles.img} source={{ uri: item.image_url }}></Image>
          <Text style={styles.sectionTextOpen}>{item.name} {item.abv}%</Text>
          <View style={styles.counter}>

            <Pressable onPress={toggleBeer} style={{marginLeft:20}}>
              {wish ? 
              <EmptyBeer color="#000" /> :
              <FullBeer color="#000"/>
              }
            </Pressable>

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
    fontWeight:'600',
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