import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { global, theme } from "../theme";
import { useUserContext } from "../User.provider";
import { beersDrunk, getAbv, getData, getPercent } from "../utils";
import { groupBy } from "lodash";
import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import { PlusIcon } from "../components/Icons";
import { usePubsContext } from "../PubsProvider";

export const Profile: React.FC = ({ navigation }: any) => {
  const UserContext = useUserContext();
  const { user } = UserContext;
  const { pubs, getAllPubs } = usePubsContext()

  useEffect(()=>{
    getAllPubs(user!.id);

  }, [])

  const abvData = Object.entries(groupBy(user?.beers, getAbv)).map(
    ([key, value]) => ({
      x: `${key}%  `,
      y: value.length,
    }),
  );

  const [percent, setPercent] = useState(0);
  const [data, setData] = useState(getData(percent));

  useEffect(() => {
    setPercent(getPercent(user!));
  }, [user]);

  useEffect(() => {
    setData(getData(percent));
  }, [percent]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerProfile}>
        <View style={styles.profileImg}>
          <Text style={[styles.profileInit, global.bold]}>{UserContext.user?.username[0].toUpperCase()}</Text>
        </View>

        <Text style={[styles.username, global.bold]}>
          {UserContext.user?.username}
        </Text>
        <View style={styles.headerSubtitle}>
          <Text style={[styles.username, global.medium]}>You got </Text>
          <Text style={[styles.subtitle, global.semibold]}>
            {beersDrunk(user!.beers).length}
          </Text>
          <Text style={[styles.username, global.medium]}> brewdog beers</Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <PieChart percent={percent} data={data} />

        {/*  LISTS */}
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BeerList")}
            style={[global.button, styles.beersButton]}>
            <Text style={[styles.buttonText, global.bold]}>Beers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("WishList")}
            style={[global.button, styles.wishButton]}>
            <Text style={[styles.buttonText, global.bold]}>Wish List</Text>
          </TouchableOpacity>
        </View>

        {/* PUBS */}
        <View style={styles.pubsTitle}>
          <Text style={[global.titleH2, global.bold]}>Pubs</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('PubForm')
            }}
            style={[styles.counterButton]}
          >
            <PlusIcon size={15} color={theme.bgDark} />
          </Pressable>
        </View>
        <ScrollView horizontal={true} style={styles.pubsList}>

          {pubs.map(pub => (
            <TouchableOpacity 
              onPress={() => {navigation.navigate('Pub', {id: pub.id})}}
              key={pub.id} 
              style={styles.photo}
            >
              <Text style={[styles.pubName, global.bold]}>{pub.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>


        <BarChart abvData={abvData}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.bgDark,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerProfile: {
    backgroundColor: theme.bluebg,
    borderBottomStartRadius: 1000,
    borderBottomEndRadius: 1000,
    paddingBottom: 10,
  },
  headerSubtitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: 20,
  },
  pubsTitle: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bluebg,
    marginLeft: 10
  },
  profileImg: {
    width: 100,
    height: 100,
    backgroundColor: theme.header,
    alignSelf: "center",
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInit: {
    fontSize: 60,
    color: theme.textDark,
  },
  username: {
    textAlign: "center",
    marginTop: 10,
    color: theme.textDark,
    fontSize: 16,
  },
  subtitle: {
    textAlign: "center",
    marginTop: 10,
    color: theme.buttonColor,
    textShadowColor: theme.bgDark,
    fontSize: 16,
  },
  pubsList: {
    width: "100%",
    maxHeight: 100,
  },
  photo: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 300,
    backgroundColor: theme.bluebg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pubName: {
    color: theme.textDark
  },
  beersButton: {
    width: 150,
    alignItems: "center",
    paddingVertical: 20,
  },
  wishButton: {
    width: 150,
    alignItems: "center",
    paddingVertical: 20,
  },
  buttonText: {
    color: theme.textDark,
    fontSize: 22,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});
