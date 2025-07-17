import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { formatDate } from '../utils/helpers'
import { mainColor } from '../data/constants'

const Header = () => {

    const [dateString, setDateString] = useState(formatDate(new Date()))

    useFocusEffect(useCallback(() => {

        const interval = setInterval(() => {
            const today = new Date();
            setDateString(formatDate(today))

        }, 60 * 1000)

        return () => clearInterval(interval);
    }, []))


    return (
        <View style={s.container}>
            <Text style={s.dateString}>{dateString}</Text>
        </View>
    )
}

export default Header

const s = StyleSheet.create({
    container: {
    
        justifyContent:"center",
        alignItems:"center",
        width: "100%",
        paddingBottom:7,
        backgroundColor: "black"
    },
    dateString: {
        color: mainColor,
        fontSize: 42,
        fontFamily: 'digital-7-mono-italic',
        textAlign: "center",
        letterSpacing: 3,
        textshadowColor: mainColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
})