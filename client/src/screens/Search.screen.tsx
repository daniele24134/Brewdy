import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, Settings } from 'react-native';
import { SearchIcon } from '../components/Icons';
import { PlusButton } from '../components/PlusButton';
import { theme } from '../theme';
import { Slider } from '../components/Slider';
import { useState } from 'react';
import { global } from '../theme';
import { Color } from '../components/Color';
import { SearchField } from '../components/SearchField';

const ebc = {
  'yellow': ['2', '12'],
  'orange': ['12','30'],
  'brown': ['30','47'],
  'black': ['47','79']
}


export const Search: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [abv, setAbv] = useState(0);
  const [ibu, setIbu] = useState(0);
  const [color, setColor] = useState<string[]>([]);
  const [food, setFood] = useState('');
  const [isPressed, setIsPressed] = useState('');

  const toggleColor = (c: string) => {
    let toggle;
    switch (c) {
      case 'yellow':
        toggle = ebc.yellow
        break;
      case 'orange':
        toggle = ebc.orange
        break;
      case 'brown':
        toggle = ebc.brown
        break;
      case 'black':
        toggle = ebc.black
        break;
    }

    if (toggle === color) {
      setColor([]);
      setIsPressed('');
    } else {
      if (toggle) {
        setColor(toggle)
        setIsPressed(c);
      };
    }
  }

  const handleSearch = () => {
    navigation.navigate('SearchBeerList', {
      name, abv, ibu, color, food
    });

    setAbv(0);
    setIbu(0);
    setColor([]);
    setFood('');
    setName('');
    setIsPressed('');
  }
  
  return (
    <View style={styles.container}>
      <SearchField name={name} setName={setName} handleSearch={handleSearch}/>

      <Text style={[styles.title, global.bold]}>Filters</Text>

      <View style={styles.filter}>
        <Text style={[styles.filterText, global.semibold]}>Abv</Text>
        <Text style={[styles.sliderText, global.semibold]}>{abv}%</Text>
        <Slider val={abv} setVal={setAbv} min={0} max={54} step={1}/>
      </View>

      <View style={styles.filter}>
        <Text style={[styles.filterText, global.semibold]}>Ibu</Text>
        <Text style={[styles.sliderText, global.semibold]}>{ibu}</Text>
        <Slider val={ibu} setVal={setIbu} min={1} max={1155} step={10}/>
      </View>

      <View style={styles.filter}>
        <Text style={[styles.filterText, global.semibold]}>Color</Text>
        <View style={{flexDirection: 'row'}}>
          <Color isPressed={(isPressed === 'yellow')} toggleColor={toggleColor} nameColor='yellow' color='#FDC426'/>
          <Color isPressed={(isPressed === 'orange')} toggleColor={toggleColor} nameColor='orange' color='#D0752C'/>
          <Color isPressed={(isPressed === 'brown')} toggleColor={toggleColor} nameColor='brown' color='#812613'/>
          <Color isPressed={(isPressed === 'black')} toggleColor={toggleColor} nameColor='black' color='#290D0E'/>
        </View>
      </View>

      <View style={styles.filter}>
        <Text style={[styles.filterText, global.semibold]}>Food</Text>
        <TextInput
          style={[styles.foodSearch, global.semibold]}
          value={food}
          onChangeText={setFood}
          placeholder={'Pairing'}
          placeholderTextColor='#ccc'
        />
      </View>

      <View style={styles.submit}>
        <TouchableOpacity onPress={handleSearch} style={global.button}>
          <Text style={[global.buttonText, global.bold]}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding,
  },
  title: {
    marginTop: 50,
    fontSize:34,
    color: theme.textDark
  },
  filter: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems:'center',
    justifyContent:'space-between',
    width: '100%'
  },
  filterText: {
    fontSize:22,
    color: theme.textDark,
    width:60
  },
  sliderText:{
    marginLeft:10,
    fontSize: 16,
    width: 40,
    color: theme.buttonColor,
    fontWeight: 'bold'
  },
  foodSearch: {
    height: 60,
    width:200,
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
    fontWeight:'600',
  },
  submit: {
    position:'absolute',
    bottom: theme.padding,
    right: theme.padding,
  }
});