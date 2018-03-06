'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

class SearchPage extends Component <{}> {
  static navigationOptions= {
    title: 'Property Finder'
  };

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.descripton}>
          Search for houses to buy!
        </Text>
        <Text style={styles.descripton}>
          Search by location or zip code.
        </Text>
        <View style={styles.flowRight}>
          <TextInput 
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          placeholder='Search via name/zipcode' />
          <Button
            onPress={() => {}}
            color='#48BBEC'
            title='Go' />
        </View>
        <Image source={require('./Resources/house.png')} style={styles.image}/>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565', 
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 30
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    marginTop: 20
  }
});

export default SearchPage;