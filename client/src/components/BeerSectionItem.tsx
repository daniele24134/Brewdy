import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, LayoutAnimation, Alert } from "react-native";
import { getBeerByBid, getPubs } from "../services/backService";
import { global, theme } from "../theme";
import { DbBeer, Pub } from "../types";
import { MinusIcon, PlusIcon } from "./Icons";
import { PubsList } from "./PubsList";

type BeerSectionProps = {
  item: DbBeer,
  increment: (id: number) => void,
  decrement: (id: number, counter: number) => void,
  handleForm: (id: number, pubs: Pub[]) => void,
  navigation: any
}

export const BeerSectionItem: React.FC<BeerSectionProps> = ({ item, increment, decrement, handleForm, navigation }) => {

  const [open, setOpen] = React.useState(false);
  const [pubs, setPubs] = useState<Pub[]>(item.pubs);

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', () => {
      getBeerByBid(item.bid).then(
        data => {setPubs(data.pubs)},
        (e:any) => {Alert.alert('Pubs not fetched correctly')}
      )
    });
    return unsubscribe;
  },[navigation]);

  return (
    <>{
      open ?
        <Pressable onPress={() => setOpen(prev => !prev)} style={[styles.sectionItemOpen]} >
          <View style={[styles.sectionItemOpenHeader]}>
            <Image style={styles.img} source={{ uri: item.image_url }}></Image>
            <View style={styles.title}>
              <Text style={[styles.sectionTextOpen, global.bold]}>
                {item.name}
              </Text>
              <Text style={[styles.sectionTextOpen, global.bold]}>
                {item.abv}% {item.ebc}
              </Text>
            </View>

            <View style={styles.counter}>

              <Pressable onPress={() => decrement(item.id, item.counter)} style={[styles.counterButton, styles.decCounter]}>
                <MinusIcon size={15} color={theme.bgDark} />
              </Pressable>

              <Text style={[styles.counterNumber, global.bold]}>{item.counter}</Text>

              <Pressable onPress={() => increment(item.id)} style={[styles.counterButton, styles.incCounter]}>
                <PlusIcon size={15} color={theme.bgDark} />
              </Pressable>

            </View>
          </View>

          {/* pubs */}
          <View style={styles.pubSection}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[global.bold, styles.pubTitle]}>Pubs </Text>
              <Pressable 
                onPress={() => {
                  handleForm(item.id, pubs);
                }} 
                style={[styles.counterButton, styles.incCounter]}
              >
                <PlusIcon size={15} color={theme.bgDark} />
              </Pressable>
            </View>
            {/* pubsList */}
            <PubsList pubs={pubs}/>
          </View>


        </Pressable> :
        <Pressable 
          onPress={() => setOpen(prev => !prev)}
          style={styles.sectionItem}
        >
          <Text style={[styles.sectionItemText, global.semibold]}>
            {item.name}
          </Text>
          <Text style={[global.regular, styles.beerDate]}>
            {format(new Date(item.createdAt), "dd MMM y, 'at' h:mmaaa")}
          </Text>
        </Pressable>
    }</>
  );
}


const styles = StyleSheet.create({
  sectionItem: {
    padding: 15,
    backgroundColor: theme.bluebg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottomColor: theme.header,
    borderBottomWidth: 1,
  },
  sectionItemText: {
    fontSize: 16,
    color: theme.textDark
  },
  sectionItemOpen: {
    width: '100%',
    backgroundColor: theme.bluebg,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  sectionItemOpenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: 20,
    width: '60%',
  },
  sectionTextOpen: {
    fontSize: 18,
    color: theme.textDark
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
  decCounter: {
    backgroundColor: theme.pinkbg,
  },
  incCounter: {
    backgroundColor: theme.buttonColor
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.textDark,
    width: 30,
    textAlign: 'center'
  },
  beerDate: {
    color: theme.pinkbg,

  },
  pubSection :{
    padding: 10
  },
  pubTitle: {
    fontSize: 18,
    color: theme.textDark
  }
})