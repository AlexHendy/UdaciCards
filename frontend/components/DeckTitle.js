import React from 'react';
import { StyleSheet, Text, View } from 'react-native';  
import { gray, black } from '../utils/colors'

export default class DeckTitle extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize: 24, textAlign: 'center'}} >{this.props.title}</Text>
        <Text style={{fontSize: 18, color: gray, textAlign: 'center'}}>{this.props.cards} Cards</Text>
      </View>
    );
  }
}

