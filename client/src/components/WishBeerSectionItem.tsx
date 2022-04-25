import { format } from "date-fns";
import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { global, theme } from "../theme";
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
          <Text style={[styles.sectionTextOpen, global.bold]}>{item.name} {item.abv}%</Text>
          <View style={styles.toggleBeer}>

            <Pressable onPress={toggleBeer} 
              style={{marginLeft:20}}
            >
              {wish ? 
              <EmptyBeer color="#000" /> :
              <FullBeer color="#000"/>
              }
            </Pressable>

          </View>
        </Pressable> :
        <Pressable 
          onPress={() => setOpen(prev => !prev)}
          style={styles.sectionItem}
        >
          <Text style={[styles.sectionItemText, global.semibold]}>
            {item.name}
          </Text>
          <Text style={[global.regular]}>
            {format(new Date(item.createdAt), "dd MMM y, 'at' h:mmaaa")}
          </Text>
        </Pressable>
    }</>
  );
}


const styles = StyleSheet.create({
  sectionItem: {
    padding: 15,
    borderBottomColor: theme.header,
    borderBottomWidth: 1,
    backgroundColor: theme.pinkbg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  sectionItemText: {
    fontSize: 16,
    color: theme.header
  },
  sectionItemOpen: {
    width: '100%',
    height: 100,
    backgroundColor: theme.pinkbg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  sectionTextOpen: {
    fontSize: 18,
    marginLeft: 20,
    width: '60%'
  },
  img: {
    width: 20,
    height: 70,
    marginLeft: 10
  },
  toggleBeer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
    justifyContent: 'space-between',
    width: 80
  },


})