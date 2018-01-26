import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';  
import DeckBtn from './DeckBtn'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'

class ListDecks extends Component {
  componentDidMount(){
    fetchDeckResults()
      .then((decks) => this.props.receiveDecks(decks))
      .catch((error) => console.log(error.message))
  }

  render() {
    const { decks } = this.props

    if (!decks){
      deck = []
    }

    return (
      <View style={{flex: 1}}>
        {decks.length !== 0
          ? <ScrollView>
              {decks.map((deck) => 
                <DeckBtn key={deck.title} deck={deck} navigation={this.props.navigation}/>
              )}
            </ScrollView>
          : <View style={styles.noDecks}>
              <Text style={{fontSize: 24, textAlign: 'center'}}>You do not have any decks.  Select Add Deck to create one!</Text>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    alignItems: 'center',
  },
  noDecks: {
    flex: 1,
    justifyContent: 'center',
  },
})

const mapDispatchToProps = { receiveDecks }

function mapStateToProps (state) {
    return {
        decks: state.deckList 
          ? Object.keys(state.deckList).map((deck) => state.deckList[deck])
          : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDecks)