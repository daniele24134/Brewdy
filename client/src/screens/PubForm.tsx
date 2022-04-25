import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { usePubsContext } from '../PubsProvider';
import { createPub, getPubs } from '../services/backService';
import { global, theme } from '../theme';
import { useThemeContext } from '../Theme.provider';
import { Pub } from '../types';
import { useUserContext } from '../User.provider';

export const PubForm: React.FC = ({route, navigation}: any) => {

  const { user } = useUserContext();
  const { addPub } = usePubsContext();
  const { themeStyle } = useThemeContext();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = () => {
    createPub(name, city, address, user!.id).then(
      (data) => {
        addPub(data);
        navigation.navigate('User', { pub: data });
        setName('');
        setCity('');
        setAddress('');
      },
      (e: any) => {
        Alert.alert('Pub not added correctly')
      }
    )
  }

  return (
    <View style={[styles.pubFormContainer, {backgroundColor: themeStyle.bg}]}>
      <Text style={[global.titleH2, global.bold, styles.pubFormTitle]}>Add a Pub</Text>
      <Text style={[styles.label, global.semibold]}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Type ...'
        placeholderTextColor={'#ccc'}
        style={[styles.pubInput, global.semibold]}
      />
      <Text style={[styles.label, global.semibold]}>City</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder='Type ...'
        placeholderTextColor={'#ccc'}
        style={[styles.pubInput, global.semibold]}
      />
      <Text style={[styles.label, global.semibold]}>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder='Type ...'
        placeholderTextColor={'#ccc'}
        style={[styles.pubInput, global.semibold]}
      />
      <TouchableOpacity onPress={handleAdd} style={[global.button, {alignSelf: 'flex-end'}]}>
        <Text style={[styles.addButton, global.bold]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pubFormContainer: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding,
    justifyContent: 'center',
    paddingBottom: 80
  },
  pubFormTitle: {
    marginBottom: 50,
    fontSize: 30,
    color: theme.buttonColor
  },
  pubInput: {
    width: '100%',
    height: 40,
    backgroundColor: theme.bluebg,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: theme.textDark
  },
  label: {
    color: theme.textDark,
    fontSize: 18,
    marginBottom: 5
  },
  addButton: {
    color: theme.textDark,
    fontSize: 18,
  }
})