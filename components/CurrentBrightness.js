import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'


const CurrentBrightness = ({ brightness }) => {




    return (
        <View style={s.container}>
            <Icon source={"brightness-6"} color='rgb(50,50,50)' size={16} />
            <Text style={s.text}>{Math.round(brightness * 100)}%</Text>
        </View>
    )
}

export default CurrentBrightness

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(50,50,50)"
    }
})