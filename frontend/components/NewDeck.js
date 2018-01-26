import React from 'react';
import { StyleSheet, Text, View } from 'react-native';  
import { black, white } from '../utils/colors'
import { createDeck } from '../utils/api'
import UdaciCardsBtn from './UdaciCardsBtn'
import InputText from './InputText'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class NewDeck extends React.Component {
    state = {
        value: '',
    }

    onChange(text) {
        this.setState({ value: text })
    }

    toDeck = (title) => {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'DeckList' }),
                NavigationActions.navigate({
                    routeName: 'Deck',
                    params: { 
                        deck: {
                            title,
                            questions: []
                        }
                    }
                })
            ]
        }))
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddDeck'
        }))
    }

    submit() {
        const title = this.state.value

        this.props.dispatch(addDeck({
            [title]: {
                title,
                questions: []
            }
        }))

        this.setState({ value: '' })

        this.toDeck(title)

        createDeck({ title })
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.question}>What is the title of your new deck?</Text>
            <View style={styles.form}>
                <InputText 
                    placeholder='Deck Title' 
                    onChange={this.onChange.bind(this)} 
                    value={this.state.value}
                />
                <UdaciCardsBtn 
                    onPress={this.submit.bind(this)} 
                    btnText='Submit' 
                    btnColor={black} 
                    textColor={white}
                />
            </View>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  question: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
  },
  form: {
      alignItems: 'center',
  }
});

export default connect(null)(NewDeck)