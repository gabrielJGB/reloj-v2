import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Day = ({date}) => {

    return (
        <View style={s.container}>
            <Text style={[s.text, s.date]}>{date}</Text>
            <View style={s.numbers}>
                <Text style={[s.text, s.temp]}>-2°</Text>
                <Text style={[s.text, s.slash]}>/</Text>
                <Text style={[s.text, s.temp]}>22°</Text>
            </View>

            <Text numberOfLines={2} style={[s.text, s.description]}>Despejado. Ventoso</Text>

        </View>
    )
}

export default Day

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap:6,
        alignItems: "center",
        paddingRight:5,
        borderRightWidth:1,
        borderColor:"red",
    },
    numbers: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontFamily: 'digital-7-mono-italic',
        color: "red",
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
    },
    date: {
        fontSize: 27
    },
    temp: {
        fontSize: 42
    },
    slash: {
        fontSize: 20
    },
    description: {
        maxWidth: 130,
        textAlign: "center",
        fontSize: 18
    }
})