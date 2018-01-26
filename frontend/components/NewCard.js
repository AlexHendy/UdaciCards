import React from 'react';
import { StyleSheet, Text, View } from 'react-native';  
import { black, white } from '../utils/colors'
import { saveCardToDeck, fetchDeck } from '../utils/api'
import UdaciCardsBtn from './UdaciCardsBtn'
import InputText from './InputText'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class NewCard extends React.Component {
    static navigationOptions = () => {
        return {
            title: 'Add Card'
        }
    }

    state = {
        questionValue: '',
        answerValue: ''
    }

    onChangeQuestion(text) {
        this.setState({ questionValue: text })
    }

    onChangeAnswer(text) {
        this.setState({ answerValue: text })
    }

    toDeck = (deck) => {
        //this.props.navigation.dispatch(NavigationActions.back('AddCard'))

        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'DeckList'}),
                NavigationActions.navigate({ routeName: 'Deck', params: { deck } })
            ],
        }))
    }

    submit() {
        const question = this.state.questionValue
        const answer = this.state.answerValue
        const { deck } = this.props.navigation.state.params
        const title = deck.title

        this.props.dispatch(addCard({
            question,
            answer
        }, title))

        this.setState({ questionValue: '', answerValue: '' })

        this.toDeck(deck)

        saveCardToDeck({ question, answer, title })
    }

    render() {
      return (
        <View style={styles.container}>
            <InputText 
                placeholder='Question' 
                onChange={this.onChangeQuestion.bind(this)} 
                value={this.state.questionValue}
            />
            <InputText 
                placeholder='Answer' 
                onChange={this.onChangeAnswer.bind(this)} 
                value={this.state.answerValue}
            />
            <UdaciCardsBtn 
                onPress={this.submit.bind(this)} 
                btnText='Submit' 
                btnColor={black} 
                textColor={white}
            />
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export default connect(null)(NewCard)