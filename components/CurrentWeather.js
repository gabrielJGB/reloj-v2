import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'

const CurrentWeather = ({modalVisible, setModalVisible}) => {
    return (
        <TouchableNativeFeedback onPress={() => { setModalVisible(!modalVisible) }}>
            <View style={s.container}>
                <View style={s.icon}></View>
                <Text style={s.temp}>8°</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default CurrentWeather

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 5,
    },
    temp: {
        fontFamily: 'digital-7-mono-italic',
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
        color: "red",
        fontSize: 160,
        lineHeight: 130,

    },
    icon: {
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: "blue"
    }
})