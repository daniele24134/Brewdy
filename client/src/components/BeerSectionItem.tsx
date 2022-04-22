import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { theme } from "../theme";
import { DbBeer } from "../types";

type BeerSectionProps = {
  item: DbBeer,
  increment: (id:number) => void,
  decrement: (id: number, counter: number) => void
}

export const BeerSectionItem:React.FC<BeerSectionProps> = ( {item, increment, decrement} ) => {

  const [open, setOpen] = React.useState(false);


  return (
    <>{
      open ? 
    <Pressable onPress={()=> setOpen(prev => !prev)} style={[styles.sectionItemOpen]}>
      <Image style={styles.img} source={{ uri: item.image_url }}></Image>
      <Text style={styles.sectionTextOpen}>{item.name} {item.abv}%</Text>
      <View style={styles.counter}>

        <Pressable onPress={() => decrement(item.id, item.counter)} style={[styles.counterButton, styles.decCounter]}>
          <Text>-</Text>
        </Pressable>

        <Text style={styles.counterNumber}>{item.counter}</Text>

        <Pressable onPress={()=> increment(item.id)} style={[styles.counterButton, styles.incCounter]}>
          <Text>+</Text>
        </Pressable>

      </View>
    </Pressable>:
      <Pressable onPress={()=> setOpen(prev => !prev)}>
        <Text style={styles.sectionItem}>{item.name}</Text>
      </Pressable>
    }</>
  );
}


const styles = StyleSheet.create({
  sectionItem: {
    padding: 15,
    backgroundColor: theme.bluebg,
    fontSize: 16,
    fontWeight: '600',
    marginBottom:1,
    color: theme.textDark
  },
  sectionItemOpen: {
    width: '100%',
    height: 100,
    backgroundColor: theme.bluebg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth:1
  },
  sectionTextOpen: {
    fontSize: 18, 
    marginLeft: 20,
    fontWeight: '600',
    width: '60%',
    color: theme.textDark
  },
  img: {
    width: 20,
    height: 70,
    marginLeft: 10
  },
  counter :{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 0,
    justifyContent: 'space-between',
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decCounter:{
    backgroundColor: 'pink'
  },
  incCounter: {
    backgroundColor: theme.buttonColor
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.textDark,
    width: 30,
    textAlign:'center'
  }
})