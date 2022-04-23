import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image,ScrollView, TouchableOpacity, Alert } from "react-native";
import { IngredientList } from "../components/Ingredient";
import { theme, global } from '../theme';
import { Beer, DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { beerParser } from "../utils";
import { addBeer, getBeerByBid, removeBeer, toggleWish } from "../services/backService";
import { EmptyBeer, EmptyHeart, FullBeer, FullHeart } from "../components/Icons";
import { CommentSection } from "../components/CommentSection";



export const BeerDetail:React.FC = ({route}: any) => {
  const beer: Beer = route.params;

  // const [beer, setBeer] = useState(beerFromRoute)

  const UserContext = useUserContext();
  const {user, updateUser} = UserContext; // user state

  const [isInBeerList, setIsInBeerList] = useState(isInTheBeerList()); // boolean state for list 
  const [isInWishList, setIsInWishList] = useState(isInTheWishList()); // boolean state for list

  const [DbBeer, setDbBeer] = useState<DbBeer | undefined>(); // the beer in the DB
  const [WishDbBeer, setWishDbBeer] = useState<DbBeer>(); // The Wish beer in the DB

  useEffect(() => {
    getBeerByBid(beer.bid)
    .then(
      data => {
        data!.wish ? setWishDbBeer(data) : setDbBeer(data);
      },
      () => {}
    )
  },[]);

  useEffect(() => {
    setIsInBeerList(isInTheBeerList());
    setIsInWishList(isInTheWishList());
  }, [user]);


  const toggleToBeers = async () => {
    if (!isInBeerList) { // add if it's not in the list
      const newBeer = beerParser(beer);
      
      if (WishDbBeer) {
        let uploadedBeer = toggleWish(WishDbBeer.id);

        uploadedBeer.then(
          (data: DbBeer) => {
            const filteredBeers = user!.beers.map(b => {
              if (b.bid === data!.bid) {
                return data!;
              } else return b;
            });
            setDbBeer(data);
            setWishDbBeer(undefined);

            updateUser({
              ...user!,
              beers: filteredBeers
            }); // updating the user context 

          },
          (e: any) => { Alert.alert('Not able to toggle') }
        )

      } else {
        let uploadedBeer = addBeer(newBeer, user!.id); // add the beer to the DB

        uploadedBeer.then(
          (data: DbBeer) => {
            setDbBeer(data);
            updateUser({ // update the user beers
              ...user!, beers: [data, ...user!.beers]
            });
          },
          (e:any) => {
            Alert.alert('Beer not added correctly')
          }
        )
      }
    } else { // remove otherwise
      if (DbBeer) {
        removeBeer(DbBeer.id); // removing from the DB

        const filteredBeers = user!.beers.filter(b => b.id !== DbBeer!.id);
        updateUser({
          ...user!,
          beers: filteredBeers
        }); // updating the user context 

        setDbBeer(undefined);
      }
    }
  }


  const toggleToWishList = async () => {
    if (!isInWishList) { // add if it's not in the list
      const newBeer = beerParser(beer);
      const uploadedBeer = addBeer({...newBeer, wish: true}, user!.id);

      uploadedBeer.then(
        (data:DbBeer) => {
          setWishDbBeer(data);
          updateUser({
            ...user!,
            beers: [data, ...user!.beers]
          });
          // setIsInWishList(prev => !prev);
        },
        (e:any) => {Alert.alert('Not added correctly in the wish list')}
      );

    } else { // remove otherwis
      if (WishDbBeer) {
        removeBeer(WishDbBeer.id); // removing from the DB
        const filteredBeers = user!.beers.filter(b => b.id !== WishDbBeer!.id);
        updateUser({
          ...user!,
          beers: filteredBeers
        }); // updating the user context 
        setWishDbBeer(undefined);
      }
    }
  }


  function isInTheBeerList () {
    return user!.beers.some(b => (b.bid === beer.bid && !b.wish));
  }

  function isInTheWishList () {
    return user!.beers.some(b => (b.bid === beer.bid && b.wish));
  }

  const WishIcon = !isInBeerList ? (
    <TouchableOpacity style={styles.button} onPress={toggleToWishList}>
      {
        isInWishList ?
          <FullHeart size={40} color={'red'} /> :
          <EmptyHeart color={'#ddd'} size={40} />

      }
    </TouchableOpacity>
  ) : undefined;

  const BeerIcon = (
  <TouchableOpacity style={styles.button} onPress={toggleToBeers}>
    {isInBeerList ?
      <FullBeer color={'#fff'} /> :
      <EmptyBeer color={'#fff'} />
    }
  </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailHeader}>
        <Image style={styles.img} source={{ uri: beer.image_url }}></Image>

        <View style={{width: 220}}>
          <Text style={[styles.beerName,styles.textColor, global.bold]}>{beer.name}</Text>
          <Text style={[styles.beerTagline, styles.textColor, global.semibold]}>{beer.tagline}</Text>

          <View style={styles.info}>

            <View style={{marginRight:20}}>
              <Text style={[styles.textColor, global.bold,{color: theme.buttonColor}]}>ABV</Text>
              <Text style={[styles.textColor, global.medium]}>{beer.abv}%</Text>
            </View>

            <View style={{marginRight:20}}>
              <Text style={[styles.textColor, global.bold,{color: theme.buttonColor}]}>IBU</Text>
              <Text style={[styles.textColor, global.medium]}>{beer.ibu}</Text>
            </View>

          </View>

          <View style={{flexDirection:'row', marginTop: 20}}>
            {BeerIcon}
            {WishIcon}
          </View>

        </View>

      </View>
      <View style={styles.description}>
        <Text style={[styles.textColor, global.medium,]}>{beer.description}</Text>
      </View>

      <View style={styles.ingredientsList}>
        {Object.keys(beer.ingredients).map(title => (
          <IngredientList key={title} 
            ingredients={beer.ingredients}
            title={title}
          />
        ))}
      </View>

      <Text style={[styles.foodTitle, global.bold]}>Food Pairing</Text>
      <Text style={[styles.textColor, global.medium]}>{beer.food_pairing.join(', ')}</Text>

      <View style={{ marginBottom: 100}}>

        <CommentSection bid={beer.bid}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgDark,
    padding: theme.padding,
    flex:1
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
    height: 200,
    justifyContent: 'space-between',
  },
  info: {
    flexDirection:'row',
    marginTop: 30
  },
  beerName: {
    fontSize: 30,
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
    color: theme.buttonColor
  },
  button: {
    marginRight: 15,
  }
});