import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { global, theme } from '../theme';
import { useUserContext } from '../User.provider';
import { beersDrunk } from '../utils';
import { VictoryLabel, VictoryPie } from 'victory-native';

export const Profile: React.FC = ({navigation}: any) => {
  const UserContext = useUserContext();
  const { user } = UserContext;

  const getPercent = () => {
    return (100 * beersDrunk(user!.beers).length) / 325;
    // return (100 * 300) / 325;
  }

  const getData = (percent: number) => {
    return [
      { x: percent, y: percent }, 
      { x: 0, y: 100 - percent }
    ];
  }
  
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState(getData(percent));

  useEffect(()=> {
    setPercent(getPercent());
  },[])

  useEffect(() => {
    setData(getData(percent));
  },[percent])

  return (
    <View style={styles.container}>
      <View style={styles.profileImg}>
          <Text style={[styles.profileInit, global.bold]}>{UserContext.user?.username[0].toUpperCase()}</Text>
      </View>

      <Text style={[styles.username, global.bold]}>{UserContext.user?.username}</Text>
      <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'baseline', marginBottom: 20}}>
        <Text style={[styles.username, global.medium]}>You got{' '}</Text>
        <Text style={[styles.subtitle, global.semibold]}>{beersDrunk(user!.beers).length}</Text>
        <Text style={[styles.username, global.medium]}>{' '}brewdog beers</Text>
      </View>
      <ScrollView>
        <View style={styles.pieContainer}>
          <Text style={styles.percentage}>{Math.round(percent)}%</Text>
          <VictoryPie
            animate={{
              duration: 2000
            }}
            radius={100}
            width={300} height={300}
            data={data}
            innerRadius={120}
            cornerRadius={0}
            labels={() => ''}
            style={{ labels: { fill: "white", fontSize: 30 } }}
            colorScale={[
              '#397D23',
              theme.header
            ]}

          />
        </View>

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

        <View style={styles.buttons}>

          <TouchableOpacity onPress={() => navigation.navigate('BeerList')} style={[global.button ,styles.beersButton]}>
            <Text style={[styles.buttonText, global.bold]}>Beers</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('WishList')} style={[global.button ,styles.wishButton]}>
            <Text style={[styles.buttonText, global.bold]}>Wish List</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: 20
  },
  pieContainer: {
    alignItems: 'center',
    width: 300,
    height: 300,
    alignSelf: 'center',
    position: 'relative'
  },
  percentage: {
    position: 'absolute',
    fontSize: 50,
    color: theme.buttonColor,
    top: 120
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
  buttonText:{
    color: theme.textDark, 
    fontSize: 22,
  },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' ,
    marginTop: 30,
    
  }
});