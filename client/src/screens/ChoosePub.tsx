import React, { useEffect } from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert, Switch } from "react-native";
import { SwitchPub } from "../components/SwitchPub";
import { usePubsContext } from "../PubsProvider";
import { createTagging, deleteTagging } from "../services/backService";
import { global, theme } from "../theme";
import { useThemeContext } from "../Theme.provider";
import { Pub } from "../types";
import { useUserContext } from "../User.provider";

export const ChoosePub: React.FC = ({ route, navigation }: any) => {

  const { user } = useUserContext();
  const { pubs, getAllPubs } = usePubsContext();
  const { themeStyle } = useThemeContext();

  useEffect(() => {
    getAllPubs(user!.id); 

  }, []);

  const { beerId, pubsIds } = route.params;

  const handleChoose = (pubId: number, ) => {
    createTagging(beerId, pubId).then(
      data => {
        
      },
      (_e: any) => Alert.alert('Connection failed'),
    )
  }

  const removeChoose = (pubId: number) => {
    deleteTagging(beerId, pubId).then(
      (data) => {
        
      },
      (e: any) => {
        console.log(e);
        Alert.alert('Pub not removed correctly');
      }
    )
  }

  const isSelected = (pubId: number) => {
    return pubsIds.includes(pubId);
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: themeStyle.bg}]}>
      <View style={styles.pubsContainer}>
        {pubs.map(pub => (
          <View
            key={pub.id} 
            style={styles.pub}
          >
            <Text style={[global.bold, {color: theme.textDark}]}>
              {pub.name}
            </Text>
            <SwitchPub
              isSelected={isSelected}
              pubId={pub.id}
              addPub={handleChoose}
              deletePub={removeChoose}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
  },
  pubsContainer: {
  },
  pub: {
    width: '100%',
    height: 50,
    backgroundColor: theme.bluebg,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 1,
    paddingHorizontal: 20,
    flexDirection: 'row'

  }
})