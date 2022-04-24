import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SectionList, Alert, TextInput, LayoutAnimation } from "react-native";
import { toggleWish } from "../services/backService";
import { global, theme } from "../theme";
import { DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { wishBeers, sectionBeers, filterBeer } from "../utils";
import { WishBeerSectionItem } from "../components/WishBeerSectionItem";

export const WishList: React.FC = () => {
  const { user, updateUser } = useUserContext();

  const [beers, setBeers] = useState(user!.beers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionData, setSectionData] = useState(
    sectionBeers(wishBeers(beers)),
  );

  const toggle = (beerId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleWish(beerId).then(
      (data: DbBeer) => {
        const updatedBeers = beers.map(b => {
          if (b.id === data.id) {
            return data;
          } else return b;
        });
        updateUser({ ...user!, beers: updatedBeers });
      },
      () => {
        Alert.alert("Not toggled correctly");
      },
    );
  };

  useEffect(() => {
    setSectionData(sectionBeers(wishBeers(beers)));
  }, [beers]);

  useEffect(() => {
    setBeers(user!.beers);
  }, [user]);

  useEffect(() => {
    setSectionData(filterBeer(
      sectionBeers(wishBeers(beers)), searchTerm
    )
    );
  }, [searchTerm]);

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchInput}
        placeholder='Search ...'
        placeholderTextColor='#ccc'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {wishBeers(beers).length ? (
        <SectionList
          sections={sectionData}
          // stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <Text style={[styles.sectionHeader, global.bold]}>
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => (
            <WishBeerSectionItem toggle={toggle} item={item} />
          )}
          keyExtractor={item => String(item!.bid)}
        />
      ) : (
        <View style={{ marginTop: "50%" }}>
          <Text style={[styles.textNobeer, global.bold]}>
            No beer in the wish list yet.
          </Text>
          <Text style={[styles.textNobeer, global.bold]}>
            Start searching for a beer.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
  },
  sectionHeader: {
    padding: 15,
    color: theme.textDark,
    backgroundColor: theme.bgDark,
    borderWidth: 1,
    fontWeight: "700",
    fontSize: 16,
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: theme.buttonColor,
    fontSize: 20,
    paddingHorizontal: 20
  },
  textNobeer: {
    color: theme.textDark,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
});
