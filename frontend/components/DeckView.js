import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';  
import { gray, black, white } from '../utils/colors'
import UdaciCardsBtn from './UdaciCardsBtn'
import DeckTitle from './DeckTitle'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { fetchDeck } from '../utils/api'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.deck.title
        }
    }

    render() {    
        const { deck } = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                <DeckTitle  title={deck.title} cards={deck.questions.length}/>
                <UdaciCardsBtn 
                    onPress={() => this.props.navigation.navigate(
                        'AddCard',
                        { deck }
                    )} 
                    btnText='Add Card' 
                    btnColor={white} 
                    textColor={black}
                />
                <UdaciCardsBtn 
                    onPress={() => this.props.navigation.navigate(
                        'Quiz',
                        { questions: deck.questions }
                    )}
                    btnText='Start Quiz' 
                    btnColor={black} 
                    textColor={white}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DeckView

// const mapDispatchToProps = { getDeck }

// function mapStateToProps (state, ownProps) {
//     return {
//         decks: state.deckList[ownProps.navigation.state.params.deck.title]
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DeckView)

