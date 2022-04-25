import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { global, theme } from "../theme";
import { useUserContext } from "../User.provider";
import { beersDrunk, getAbv, getData, getPercent } from "../utils";
import { groupBy } from "lodash";
import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";

export const Profile: React.FC = ({ navigation }: any) => {
  const UserContext = useUserContext();
  const { user } = UserContext;

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

        {/* PHOTOS */}
        <Text style={[global.titleH2, global.bold]}>Photos</Text>
        <ScrollView horizontal={true} style={styles.photosList}>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
          <View style={styles.photo}></View>
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
  pieContainer: {
    alignItems: "center",
    width: 300,
    height: 300,
    alignSelf: "center",
    position: "relative",
  },
  percentage: {
    position: "absolute",
    fontSize: 50,
    color: theme.buttonColor,
    top: 120,
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
  photosList: {
    width: "100%",
    maxHeight: 70,
  },
  photo: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: theme.header,
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
