import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Animated } from 'react-native'
import DeckTitle from './DeckTitle'
import { white } from '../utils/colors'

export default class DeckBtn extends Component {
    state = {
        bounceValue: new Animated.Value(1),
    }

    render(){
        const { deck, navigation } = this.props
        const { bounceValue } = this.state

        return (
            <Animated.View style={{transform: [{scale: bounceValue}]}} key={deck.title} >
                <TouchableOpacity 
                    style={styles.deck} 
                    onPress={() => {
                        Animated.sequence([
                            Animated.timing(bounceValue, { duration: 200, toValue: 1.05 }),
                            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
                        ]).start()
                        
                        setTimeout(() => navigation.navigate(
                            'Deck',
                            { deck }
                        ), 500)
                    }}
                > 
                    <DeckTitle title={deck.title} cards={deck.questions.length}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
      backgroundColor: white,
      borderRadius: 10,
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
          width: 0,
          height: 3,
      }
  },
})