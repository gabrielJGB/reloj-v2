import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Day from './Day'

const ForecastScroll = () => {
    return (
        <ScrollView horizontal>
            <View style={s.container}>
                {
                    ["Hoy", "Mañana", "Sabado 5", "Domingo 6", "Lunes 7", "Martes 8", "Miercoles 9"].map((date,i) => (
                        <Day key={i} date={date}/>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default ForecastScroll

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
})