import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CurrentWeather from './CurrentWeather'
import ForecastScroll from './ForecastScroll'
import SelectCityModal from './SelectCityModal'

const Weather = () => {

    const [city, setCity] = useState(true)
    const [modalVisible, setModalVisible] = useState(true);

    return (
        <View style={s.container}>
            <SelectCityModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            {
                city ?
                    <>
                        <CurrentWeather modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                        <ForecastScroll />
                    </>
                    :
                    <TouchableNativeFeedback onPress={() => { }}>
                        <Text style={s.selectButton}>Seleccionar ubicación</Text>
                    </TouchableNativeFeedback>
            }
        </View>
    )
}

export default Weather

const s = StyleSheet.create({
    container: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        // backgroundColor: "#2c2c2c",
    },
    selectButton: {
        textAlign: "center",
        fontFamily: 'digital-7-mono-italic',
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
        color: "red",
        fontSize: 28,
        padding: 22,
    }

})