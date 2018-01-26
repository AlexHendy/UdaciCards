import React, {Component} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { black, white } from '../utils/colors'

export default class InputText extends Component {
    render() {
        return (
            <View>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChange}
                    value={this.props.value}
                />
            </View>
       )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: white,
        height: 40,
        width: 300,
        padding: 10,
        borderColor: black,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30,
    },
})
