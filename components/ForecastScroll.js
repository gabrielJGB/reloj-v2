import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Day from './Day'
import { findMinMaxTemperature, sumPrecipitation } from '../utils/helpers'
import DayModalOverview from './DayModalOverview'

const ForecastScroll = ({ dailyForecast,setDayModalVisible,setSelectedDayForecast,setSelectedDayIndex }) => {
 

    return (
        <ScrollView horizontal>
            <View style={s.container}>
                
                {
                    Array.from({ length: 10 }).map((date, i) => {
                        return dailyForecast[i].title != "Ayer" && <Day
                            key={i}
                            dailyForecast={dailyForecast}
                            setDayModalVisible={setDayModalVisible}
                            setSelectedDayIndex={setSelectedDayIndex}
                            index={i}
                            
                        />
                    })
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
        // gap: 10
    },
})