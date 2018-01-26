import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { black, white, red, green } from '../utils/colors'
import UdaciCardsBtn from './UdaciCardsBtn'

class QuestionView extends Component {
    state = {
        frontView: true
    }

    flipCard(frontView) {
        this.setState({ frontView: !frontView })
    }

    answerQuestion(value){
        this.setState({ frontView: true })
        this.props.answerQuestion(value)
    }

    render() {
        const { frontView } = this.state
        return (
            <View>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    {frontView ? this.props.question : this.props.answer}
                </Text>
                <TouchableOpacity
                    style={{ paddingTop: 20 }}
                    onPress={this.flipCard.bind(this, frontView)}>
                    <Text style={styles.flipCard}>Show {frontView ? 'Answer' : 'Question'}</Text>
                </TouchableOpacity>

                <View style={styles.buttons}>
                    <UdaciCardsBtn
                        onPress={this.answerQuestion.bind(this, true)}
                        btnText='Correct'
                        btnColor={green}
                        textColor={white}
                    />
                    <UdaciCardsBtn
                        onPress={this.answerQuestion.bind(this, false)}
                        btnText='Incorrect'
                        btnColor={red}
                        textColor={white}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flipCard: {
        color: red,
        textAlign: 'center'
    },
    buttons: {
        alignItems: 'center',
        paddingTop: 30,
    },
})

export default QuestionView