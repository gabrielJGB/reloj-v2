import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Day from './Day'
import { findMinMaxTemperature, sumPrecipitation } from '../utils/helpers'

const ForecastScroll = ({ dailyForecast }) => {


    return (
        <ScrollView horizontal>
            <View style={s.container}>
                {
                    Array.from({ length: 10 }).map((date, i) => (
                        <Day
                            key={i}
                            date={dailyForecast[i].title.replace("á", "A").replace("é", "E")}
                            maxTemp={Math.round(findMinMaxTemperature(dailyForecast[i]?.weather).maxTemp.value)}
                            minTemp={Math.round(findMinMaxTemperature(dailyForecast[i]?.weather).minTemp.value)}
                            condition={dailyForecast[i].weather[0]["symbol"]["@_name"].replace(" ", "\n")}
                            rain={sumPrecipitation(dailyForecast[i]?.weather)}
                        />
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