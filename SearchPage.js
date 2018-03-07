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

function urlForQueryAndPage(key, value, pageNumber){
  const data= {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
  return 'https://api.nestoria.co.uk/api?' + querystring;
}

class SearchPage extends Component <{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'London',
      isLoading: false,
      message: '',
    };
  }

  _onSearchTextChanged = (e) => {
    this.setState({ searchString: e.nativeEvent.text });
  }

  _executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
    .then(repsonse => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error => this.setState({
      isLoading: false,
      message: 'Something bad happened: ' + error
    }));
  }

  _onSearchPressed = () => {
    const query = 
    urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }


  static navigationOptions= {
    title: 'Property Finder'
  };


  render(){
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large' /> : null
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
          value={this.state.searchString}
          onChange={this._onSearchTextChanged}
          placeholder='Search via name/zipcode' />
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Go' />
        </View>
        <Image source={require('./Resources/house.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>
        {this.state.message}
        </Text>
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