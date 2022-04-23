import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { global, theme, chartTheme } from '../theme';
import { useUserContext } from '../User.provider';
import { beersDrunk, getAbv, getData, getPercent } from '../utils';
import { 
  VictoryBar, 
  VictoryPie, 
  VictoryChart, 
  VictoryLabel, 
  VictoryAxis,
  VictoryZoomContainer
} from 'victory-native';
import { groupBy } from 'lodash';

export const Profile: React.FC = ({navigation}: any) => {
  const UserContext = useUserContext();
  const { user } = UserContext;

  const abvData = Object.entries(groupBy(user?.beers, getAbv)).map(
    ([key, value]) => ({
      x: `${key}%  `,
      y: value.length
    })
  );
 
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState(getData(percent));

  useEffect(()=> {
    setPercent(getPercent(user!));
  },[user]);

  useEffect(() => {
    setData(getData(percent));
  },[percent]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerProfile}>
        <View style={styles.profileImg}>
            <Text style={[styles.profileInit, global.bold]}>{UserContext.user?.username[0].toUpperCase()}</Text>
        </View>

        <Text style={[styles.username, global.bold]}>{UserContext.user?.username}</Text>
        <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'baseline', marginBottom: 20}}>
          <Text style={[styles.username, global.medium]}>You got{' '}</Text>
          <Text style={[styles.subtitle, global.semibold]}>{beersDrunk(user!.beers).length}</Text>
          <Text style={[styles.username, global.medium]}>{' '}brewdog beers</Text>
        </View>
      </View>
      

      <ScrollView style={styles.container}>
        <View style={styles.pieContainer}>
          <Text style={styles.percentage}>{Math.round(percent)}%</Text>
          <VictoryPie
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            radius={100}
            width={300} height={300}
            data={data}
            innerRadius={120}
            cornerRadius={0}
            labels={() => ''}
            style={{ labels: { fill: "white", fontSize: 30 } }}
            colorScale={[
              theme.bluebg,
              theme.header
            ]}

          />
        </View>
            {/*  LISTS */}
        <View style={styles.buttons}>

          <TouchableOpacity onPress={() => navigation.navigate('BeerList')} style={[global.button ,styles.beersButton]}>
            <Text style={[styles.buttonText, global.bold]}>Beers</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('WishList')} style={[global.button ,styles.wishButton]}>
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

        <View style={{marginTop: 40}}>
          <Text style={[global.bold, global.titleH2, {marginBottom:0}]}>Statistic ABV</Text>
          <VictoryChart
            defaultAxes={{}}
            theme={chartTheme}
            domainPadding={{x:5}}
            padding={40}
            width={370}
            height={400}
          >
            <VictoryAxis style={{ grid: { stroke: "none" } }}/>
            <VictoryAxis dependentAxis/>
            <VictoryBar horizontal
              data={abvData}
              style={{ 
                data: { 
                  fill: theme.buttonColor,
                  stroke: "black",
                  strokeWidth: 1.2
                },
              }}
              alignment="middle"
              
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            />
          </VictoryChart>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.bgDark,
    flex:1,
    zIndex:0,
    position:'relative'
  },
  container: {
    flex: 1,
    padding: 20,
    zIndex:2,
    position:'relative'
  },
  headerProfile: { 
    backgroundColor: theme.bluebg,
    borderBottomStartRadius: 1000,
    borderBottomEndRadius:1000,
    paddingBottom: 10,
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
    textShadowColor: theme.bgDark,
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
    marginBottom: 30,
  }
});