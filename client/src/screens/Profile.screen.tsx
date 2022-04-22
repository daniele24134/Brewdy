import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { fetchUser } from '../services/backService';
import { global, theme } from '../theme';
import { useUserContext } from '../User.provider';
import { beersDrunk } from '../utils';



export const Profile: React.FC = ({navigation}: any) => {

  const UserContext = useUserContext();
  const {user} = UserContext;

  return (
    <View style={styles.container}>
      <View style={styles.profileImg}>
          <Text style={styles.profileInit}>{UserContext.user?.username[0].toUpperCase()}</Text>
      </View>

      <Text style={styles.username}>{UserContext.user?.username}</Text>
      <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'baseline', marginBottom: 20}}>
        <Text style={styles.username}>You got{' '}</Text>
        <Text style={styles.subtitle}>{beersDrunk(user!.beers).length}</Text>
        <Text style={styles.username}>{' '}brewdog beers</Text>
      </View>

      <Text style={global.titleH2}>Photos</Text>
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

      <View style={styles.buttons}>

        <TouchableOpacity onPress={() => navigation.navigate('BeerList')} style={[global.button ,styles.beersButton]}>
          <Text style={{color: theme.textDark, fontSize: 22, fontWeight: '600'}}>Beers</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('WishList')} style={[global.button ,styles.wishButton]}>
          <Text style={{color: theme.textDark, fontSize: 22, fontWeight: '600'}}>Wish List</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: 20
  },
  profileImg: {
    width: 100,
    height:100,
    backgroundColor: theme.header,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
  profileInit: {
    fontSize: 60,
    fontWeight: '500',
    color: theme.textDark,

  },
  username: {
    textAlign: 'center',
    marginTop: 10,
    color: theme.textDark,
    fontSize: 16,
    
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    color: theme.buttonColor,
    fontSize: 16,
    fontWeight: '600'

  },
  photosList: {
    width: '100%',
    maxHeight: 70
  },
  photo: {
    width: 60,
    height:60,
    marginRight: 8,
    backgroundColor: theme.header
  },
  beersButton:{
    width:150,
    alignItems:'center',
    paddingVertical: 20
  },
  wishButton: {
    width:150,
    alignItems:'center',
    paddingVertical: 20
  },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' ,
    marginTop: 30,
    
  }
});