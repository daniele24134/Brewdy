import React from "react";
import { View,TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SearchIcon } from "./Icons";
import { theme } from "../theme";

type SearchFieldProps = {
  name: string,
  setName: (name:string)=> void,
  handleSearch: () => void
}


export const SearchField:React.FC<SearchFieldProps> = ({name, setName, handleSearch}) => {

  return (
    <View style={styles.searchField}>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.searchInput}
        placeholder={'Search'}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.icon}>
        <SearchIcon color='black' />
      </TouchableOpacity>
    </View>
  );

}


const styles = StyleSheet.create({
  searchInput: {
    width: '100%',
    height: 60,
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,

  },
  searchField: {
    flexDirection: 'row',

  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
});