import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Pub } from "../types";
import { getPub } from "../services/backService";
import { global, theme } from "../theme";

export const PubScreen: React.FC = ({ route }: any) => {

  const [pub, setPub] = useState<Pub>();

  const {id} = route.params;

  useEffect(() => {
    getPub(id).then(
      data => {setPub(data)}
    )
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.pubTitle, global.bold]}>
          {pub?.name}
        </Text>
        <View style={styles.info}>
          <View style={{alignItems: 'center'}}>
            <Text style={[global.semibold, styles.subTitle]}>City</Text>
            <Text style={[global.semibold, styles.infoText]}>{pub?.city}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={[global.semibold, styles.subTitle]}>Address</Text>
            <Text style={[global.semibold, styles.infoText]}>{pub?.address}</Text>
          </View>
        </View>

      </View>
      <Text style={[global.bold, styles.beerTitle]}>Beers</Text>
      <ScrollView>
        {pub?.beers?.map(beer => (
          <View key={beer.id} style={styles.beer}>
            <Text style={[global.semibold, styles.beertext]}>
              {beer.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
  },
  header: { 
    padding: theme.padding, 
    backgroundColor: theme.bluebg,
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
    minHeight: 200,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  infoText: {
    color: theme.textDark,
    fontSize: 16
  },
  pubTitle: {
    color: theme.textLight,
    fontSize: 50,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 24,
    color: theme.header
  },
  beerTitle: {
    fontSize: 30,
    color: theme.buttonColor,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  beer: {
    marginBottom: 1,
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: theme.header,
    justifyContent: 'center',
  },
  beertext: {
    color: theme.textDark,
    fontSize: 16,
  }

});