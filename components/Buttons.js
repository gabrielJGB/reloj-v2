import React, { useState } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import * as Brightness from 'expo-brightness';

const Buttons = ({ brightness, setBrightness }) => {



    const changeBrightness = async (delta) => {
        let newBrightness = brightness + delta;


        newBrightness = Math.min(1, Math.max(0, newBrightness));

        await Brightness.setBrightnessAsync(newBrightness);
        setBrightness(newBrightness);
    };


    return (
        <View style={s.container}>

            <TouchableNativeFeedback onPress={() => { changeBrightness(-0.1) }}>
                <View style={s.brightnessButton}></View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => { changeBrightness(0.1) }}>
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
        borderWidth:1,
        // borderColor:"rgba(120,0,0,0.2)",
        width: "47%",
        borderRadius: 0,
        paddingVertical: 96,
        // backgroundColor:"rgba(200,0,0,0.2)"
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