'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    const title = item.title;
    const slimTitle = title.slice(0, title.indexOf(','));
    const price = item.price_formatted.split(' ')[0];
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.img_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title}
                numberOfLines={1}>{slimTitle}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item, index }) => {
    return (
      <ListItem 
      item={item}
      index={index}
      onPressItem={this._onPressItem}
      />
      );
  };

  _onPressItem = (index) => {
    console.log('Pressed row: ' + index);
  };

  render() {
    const { params } = this.props.navigation.state;
    const searchArea = params.searchArea;
    return (
      <View>
        <Text style={styles.searchArea}>Properties in {searchArea}</Text>
        <FlatList
        data={params.listings}
        _keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchArea: {
    marginTop: 10,
    paddingBottom: 5,
    color: '#333',
    textAlign: 'center',
    fontSize: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1
  },
  seperator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});

export default SearchResults;