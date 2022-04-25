import React, { useEffect } from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { usePubsContext } from "../PubsProvider";
import { createTagging } from "../services/backService";
import { global, theme } from "../theme";
import { useUserContext } from "../User.provider";

export const ChoosePub: React.FC = ({ route, navigation }: any) => {

  const { user } = useUserContext();
  const { pubs, getAllPubs } = usePubsContext();

  useEffect(() => {
    getAllPubs(user!.id);
    
  }, []);

  const { beerId } = route.params;

  const handleChoose = (pubId: number, ) => {
    createTagging(beerId, pubId).then(
      data => {
        navigation.goBack();
      },
      (_e: any) => Alert.alert('Connection failed'),
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pubsContainer}>
        {pubs.map(pub => (
          <TouchableOpacity
            onPress={() => handleChoose(pub.id)}
            key={pub.id} 
            style={styles.pub}
          >
            <Text style={[global.bold, {color: theme.textDark}]}>
              {pub.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding,
  },
  pubsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  pub: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: theme.bluebg,
    justifyContent: 'center',
    alignItems: 'center'
  }
})