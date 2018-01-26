import React from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text } from 'react-native'

const UdaciCardsBtn = ({ onPress, btnText, btnColor, textColor }) => {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: btnColor}]}
            onPress={onPress}
        >
            <Text style={[styles.BtnText, {color: textColor}]} >{btnText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 3,
        height: 45,
        width: 125,
        margin: 15,
    },
    BtnText: {
        fontSize: 22,
        textAlign: 'center',
    },
})

export default UdaciCardsBtn