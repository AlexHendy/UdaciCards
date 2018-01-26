import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { black, white, red, green } from '../utils/colors'
import QuestionView from './QuestionView'
import UdaciCardsBtn from './UdaciCardsBtn'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizView extends Component {
    static navigationOptions = () => {
        return {
            title: 'Quiz'
        }
    }

    state = {
        questionNumber: 0,
        numberCorrect: 0,
    }

    answerQuestion(value){
        this.setState((state) => ({
            questionNumber: state.questionNumber + 1,
            numberCorrect: value ? state.numberCorrect + 1 : state.numberCorrect
        }))
    }

    reset(){
        this.setState({
            questionNumber: 0,
            numberCorrect: 0
        })
    }

    toDeck(){
        this.props.navigation.dispatch(NavigationActions.back('Quiz'))
    }

    completion(numberCorrect, total){
        clearLocalNotification()
            .then(setLocalNotification)

        return (
            <View style={styles.noCards}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>You've completed the quiz!</Text>  
                <Text style={{fontSize: 24, textAlign: 'center'}}>Your score is:</Text>
                <Text style={{color: green, fontSize: 32, textAlign: 'center'}}>{Math.floor((numberCorrect / total) * 100)}%</Text>
                <View style={styles.buttons}>
                    <UdaciCardsBtn 
                        onPress={this.reset.bind(this)} 
                        btnText='Restart' 
                        btnColor={white} 
                        textColor={black}
                    />
                    <UdaciCardsBtn 
                        onPress={this.toDeck.bind(this)} 
                        btnText='To Deck' 
                        btnColor={black} 
                        textColor={white}
                    />
                </View>
            </View>
        )
    }

    render() {
        const { questions } = this.props.navigation.state.params
        const { questionNumber, numberCorrect } = this.state

        return (
            <View style={{flex: 1}}>
                {questions.length === 0 
                    ? <View style={styles.noCards}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>You do not have any cards.</Text>  
                        <Text style={{fontSize: 24, textAlign: 'center'}}>Select Add Card on your deck to create one!</Text>
                        <UdaciCardsBtn 
                            onPress={this.toDeck.bind(this)} 
                            btnText='To Deck' 
                            btnColor={black} 
                            textColor={white}
                        />
                    </View>
                    : <View style={{flex: 1}}>
                        {(questionNumber + 1) > questions.length
                            ? this.completion(numberCorrect, (questions.length))
                            : <View>
                                <Text style={styles.status}>{this.state.questionNumber + 1} / {questions.length}</Text>
                                <View style={styles.card}>
                                    <QuestionView 
                                        question={questions[questionNumber].question} 
                                        answer={questions[questionNumber].answer}
                                        answerQuestion={this.answerQuestion.bind(this)} 
                                    />
                                </View>
                            </View>
                        }
                    </View> 
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    status: {
        padding: 10,
        fontSize: 18,
    },
    buttons: {
        alignItems: 'center',
        paddingTop: 30,
    },
    card: {
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

export default QuizView