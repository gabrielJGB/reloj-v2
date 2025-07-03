import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'

const Buttons = () => {
    return (
        <View style={s.container}>

            <TouchableNativeFeedback onPress={() => {  }}>
                <View style={s.brightnessButton}></View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => { }}>
                <View style={s.brightnessButton}></View>
            </TouchableNativeFeedback>

        </View>
    )
}

export default Buttons

const s = StyleSheet.create({
    container: {
        zIndex: 20,
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        left: 0,
        
    },
    brightnessButton: {
        width: "50%",
        height: "100%",
        borderRadius: 0,
        paddingVertical: 120,
    },
    brightness: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 10,
        zIndex: 20,
        font: 16,
        color: "#3c3c3c",
        fontWeight: "800"
    }
})