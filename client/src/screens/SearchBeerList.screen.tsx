import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { global, theme } from "../theme";
import { fetchQuery } from "../services/apiService";
import { Beer } from "../types";
import { BeerItem } from "../components/BeerItem";
import { beersParser } from "../utils";
import { useThemeContext } from "../Theme.provider";

export const SearchBeerList: React.FC = ({ route, navigation }: any) => {
  const { name, abv, ibu, color, food } = route.params;
  const [beers, setBeers] = useState<Beer[]>([]);

  const { themeStyle } = useThemeContext();

  useEffect(() => {
    let url = "/beers?";

    if (abv > 0) url += `abv_gt=${abv}`;
    if (name) {
      url += `&beer_name=${name.replace(/\s+/g, "_")}`;
    }
    if (ibu > 0) url += `&ibu_gt=${ibu}`;
    if (color.length) url += `&ebc_gt=${color[0]}&ebc_lt=${color[1]}`;
    if (food) url += `&food=${food}`;

    // console.warn({ abv, ibu, color, food })
    const beersResult = fetchQuery(url);
    beersResult.then(
      data => {
        setBeers(beersParser(data));
      },
      (_e: any) => {
        Alert.alert("Beers not fetched correctly");
      },
    );
  }, []);

  const navigateToBeer = (beer: Beer) => {
    navigation.navigate("Beer", beer);
  };

  return (
    <View style={[styles.container, {backgroundColor: themeStyle.bg}]}>
      {beers.length ? (
        <FlatList
          data={beers}
          keyExtractor={(item: Beer) => String(item.bid)}
          renderItem={({ item }) => (
            <BeerItem beer={item} navigateToBeer={navigateToBeer} />
          )}
        />
      ) : (
        <Text
          style={[{ color: themeStyle.text, alignSelf: "center" }, global.bold]}>
          No beer sorry
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding,
  },
});
