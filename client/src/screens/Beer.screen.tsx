import React, { useState } from "react";
import { StyleSheet, Text, View, Image,ScrollView, TouchableOpacity, Alert } from "react-native";
import { IngredientList } from "../components/Ingredient";
import {theme} from '../theme';
import { Beer, BeerForCreate, DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { beerParser } from "../utils";
import { addBeer, removeBeer } from "../services/backService";
import { EmptyBeer, EmptyHeart, FullBeer, FullHeart } from "../components/Icons";



export const BeerDetail:React.FC = ({route}: any) => {
  const beer: Beer = route.params;

  const UserContext = useUserContext();
  const {user, updateUser} = UserContext;
  const [isInBeerList, setIsInBeerList] = useState(isInTheBeerList());
  const [isInWishList, setIsInWishList] = useState(isInTheWishList());
  const [DbBeer, setDbBeer] = useState<DbBeer>();
  const [WishDbBeer, setWishDbBeer] = useState<DbBeer>();


  const addToBeers = async () => {
    const newBeer = beerParser(beer);
    if (!isInBeerList) {
      const uploadedBeer = await addBeer(newBeer, user!.id);
      setDbBeer(uploadedBeer);
      updateUser({
        ...user!,
        beers: [uploadedBeer,...user!.beers]
      });
      setIsInBeerList(prev => !prev);
      Alert.alert('Added to your beer list');
    } else {
      if (DbBeer) removeBeer(DbBeer.id);
      const filteredBeers = user!.beers.filter(b => b.id !== DbBeer!.id);
      updateUser({
        ...user!,
        beers: filteredBeers
      });
      setDbBeer(undefined);
      setIsInBeerList(prev => !prev);
      Alert.alert('Removed from your beer list');
    }
  }

  const addToWishList = async () => {
    const newBeer = beerParser(beer);
    if (!isInWishList) {
      const uploadedBeer = await addBeer({...newBeer, wish: true}, user!.id);
      setWishDbBeer(uploadedBeer);
      updateUser({
        ...user!,
        beers: [uploadedBeer, ...user!.beers]
      });
      setIsInWishList(prev => !prev);
      Alert.alert('Added to your wish list');
    } else {
      if (WishDbBeer) removeBeer(WishDbBeer.id);
      const filteredBeers = user!.beers.filter(b => b.id !== WishDbBeer!.id);
      updateUser({
        ...user!,
        beers: filteredBeers
      });
      setWishDbBeer(undefined);
      setIsInWishList(prev => !prev);
      Alert.alert('Removed from the wish list');
    }
  }

  function isInTheBeerList () {
    return user!.beers.some(b => (b.bid === beer.bid && !b.wish));
  }

  function isInTheWishList () {
    return user!.beers.some(b => (b.bid === beer.bid && b.wish));
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailHeader}>
        <Image style={styles.img} source={{ uri: beer.image_url }}></Image>

        <View style={{width: 220}}>
          <Text style={[styles.beerName,styles.textColor]}>{beer.name}</Text>
          <Text style={[styles.beerTagline, styles.textColor]}>{beer.tagline}</Text>

          <View style={styles.info}>

            <View style={{marginRight:20}}>
              <Text style={[styles.textColor]}>ABV</Text>
              <Text style={[styles.textColor]}>{beer.abv}%</Text>
            </View>

            <View style={{marginRight:20}}>
              <Text style={[styles.textColor]}>IBU</Text>
              <Text style={[styles.textColor]}>{beer.ibu}</Text>
            </View>

          </View>

          <View style={{flexDirection:'row', marginTop: 20}}>
            <TouchableOpacity style={styles.button} onPress={addToBeers}>
                { isInBeerList ?
                  <FullBeer color={'#fff'}/> :
                  <EmptyBeer color={ '#fff' }/>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addToWishList}>
                {
                  isInWishList ?
                  <FullHeart size={43} color={'red'}/> :
                  <EmptyHeart color={'#ddd'} size={43}/>
                  
                }
            </TouchableOpacity>
          </View>

        </View>

      </View>
      <View style={styles.description}>
        <Text style={[styles.textColor]}>{beer.description}</Text>
      </View>
      <View style={styles.ingredientsList}>
        {Object.keys(beer.ingredients).map(title => (
          <IngredientList key={title} 
            ingredients={beer.ingredients}
            title={title}
          />
        ))}

      </View>
      <Text style={[styles.foodTitle]}>Food Pairing</Text>
      <Text style={[styles.textColor,{marginBottom: 100}]}>{beer.food_pairing.join(', ')}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding
  },
  img: {
    width: 70,
    height: 200,
    resizeMode: 'cover',
    overflow: 'visible',
  },
  detailHeader: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    height: '30%',
    justifyContent: 'space-between'
  },
  info: {
    flexDirection:'row',
    marginTop: 30
  },
  beerName: {
    fontSize: 30,
    fontWeight: '700',
  },
  beerTagline: {
    fontSize: 18,
  },
  textColor: {
    color:theme.textDark
  },
  description: {
    marginTop:65
  },
  ingredientsList:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:30,
    marginBottom: 50,
  },
  foodTitle:{
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: theme.buttonColor
  },
  button: {
    marginRight: 15,
  }
});