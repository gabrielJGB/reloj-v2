import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CurrentBrightness = ({ brightness }) => {
    return (
        <View style={s.container}>
            <Text style={s.text}>{Math.round(brightness * 100)}%</Text>
        </View>
    )
}

export default CurrentBrightness

const s = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,

    },
    text: {
        padding:5,
        fontSize: 18,
        fontWeight:"500",
        color: "rgb(50,50,50)"
    }
})