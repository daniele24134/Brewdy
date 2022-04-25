import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import { Pub } from "../types";
import { deletePub, deleteTagging, getPub } from "../services/backService";
import { global, theme } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePubsContext } from "../PubsProvider";
import { TrashIcon } from "../components/Icons";
import { useThemeContext } from "../Theme.provider";

export const PubScreen: React.FC = ({ route, navigation }: any) => {

  const [pub, setPub] = useState<Pub>();
  const { removePub } = usePubsContext();
  const { themeStyle, isDark } = useThemeContext();

  const {id} = route.params;

  useEffect(() => {
    getPub(id).then(
      data => {setPub(data)}
    )
  },[]);

  const handleDelete = () => {
    deletePub(id).then(
      data => {
        removePub(data.id);
        navigation.goBack()
      },
      (e: any) => {
        console.log(e);
        Alert.alert('Pub note removed correctly');
      }
    )
  }

  const handleDeleteTagging = (beerId: number) => {
    deleteTagging(beerId, id).then(
      (data) => {
        const filteredBeers = pub?.beers?.filter(b => b.id !== data.BeerId);
        setPub({
          ...pub!, beers: filteredBeers
        });
      },
      (e: any) => {
        console.log(e);
        Alert.alert('Not deleted correctly');
      }
    )
  }

  return (
    <View style={[styles.container, {backgroundColor: themeStyle.bg}]}>
      <View style={styles.header}>
        <Text style={[styles.pubTitle, global.bold, {color: themeStyle.bg}]}>
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
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'baseline', marginBottom: 20}}>
        <Text style={[global.bold, styles.beerTitle]}>Beers</Text>
        <TouchableOpacity onPress={handleDelete} style={[global.button,styles.deleteButton]}>
          <Text style={[global.bold, global.buttonText]}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {pub?.beers?.map(beer => (
          <View key={beer.id} style={!isDark ? styles.beer : [styles.beerLight]}>
            <Text style={[global.semibold, styles.beertext, {color: themeStyle.text}]}>
              {beer.name} {beer.abv}%
            </Text>
            <Pressable onPress={() => handleDeleteTagging(beer.id)}>
              <TrashIcon size={25} color={themeStyle.text}/>
            </Pressable>
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
    color: theme.pinkbg,
  },
  beerTitle: {
    fontSize: 30,
    color: theme.buttonColor,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  beer: {
    marginBottom: 2,
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: theme.header,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  beerLight: {
    marginBottom: 2,
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.bgLight,
  },
  beertext: {
    color: theme.textDark,
    fontSize: 16,
  },
  deleteButton: {
    marginRight: theme.padding,
  },
});