import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { theme, global } from "../theme";
import { useThemeContext } from "../Theme.provider";
import { Beer } from "../types";

type BeerItemProps = {
  beer: Beer,
  navigateToBeer: (beer: Beer) => void,
}

export const BeerItem: React.FC<BeerItemProps> = ({ beer, navigateToBeer }: BeerItemProps) => {
  const { themeStyle } = useThemeContext();

  return (
    <TouchableOpacity style={styles.beerItem} onPress={() => navigateToBeer(beer)}>
      <Image style={styles.img} source={{ uri: beer.image_url }}></Image>
      <View style={{ marginLeft: 20 }}>
        <Text style={[{ color: themeStyle.text }, styles.beerName, global.bold]}>{beer.name}</Text>
        <Text style={[{ color: themeStyle.text }, global.semibold]}>{beer.tagline}</Text>
        <Text style={[{ color: themeStyle.text }, global.medium]}>{beer.abv}% {' - '} {beer.ibu} IBU</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  img: {
    width: 26,
    height: 1,
    resizeMode: 'cover',
    overflow: 'visible',
  },
  beerItem: {
    marginTop: 20,
    height: 120,
    padding: 30,
    borderWidth: 1,
    borderColor: theme.buttonColor,
    borderRadius: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(83,162,190,0.2)',
  },
  beerName: {
    fontSize: 20,
    width: 250
  }
})