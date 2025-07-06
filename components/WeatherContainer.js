import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CurrentWeather from './CurrentWeather'
import ForecastScroll from './ForecastScroll'
import SelectCityModal from './SelectCityModal'
import { getCity } from '../utils/storage'
import { fetchXML } from '../utils/fetch'
import { agruparPorDia, formatearFecha } from '../utils/helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DayModalOverview from './DayModalOverview'

const Weather = ({selectedDayIndex, setSelectedDayIndex}) => {

    const [selectedCity, setSelectedCity] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [dayModalVisible, setDayModalVisible] = useState(false)
    const [loadingCurrent, setLoadingCurrent] = useState(true);
    const [loadingMeteogram, setLoadingMeteogram] = useState(true);
    const [error, setError] = useState(false);
    const [currentForecast, setCurrentForecast] = useState(false)
    const [dailyForecast, setDailyForecast] = useState(false)
    const [selectedDayForecast, setSelectedDayForecast] = useState(false)


    const checkCity = async () => {

        try {
            const city = await AsyncStorage.getItem('city');

            setLoadingCurrent(true)
            setLoadingMeteogram(true)
            if (city != null) {
                setSelectedCity(city);
            } else {
                setSelectedCity(false);

            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoadingMeteogram(false)
            setLoadingCurrent(false)
        }

    };


    const _fetchCityWeather = () => {
        if (selectedCity != null) {


            setLoadingCurrent(true)
            getCity()
                .then(city => {
                    console.log("saved:", selectedCity)
                    console.log("Fetching current weather... ", new Date());
                    const nowUrl = `https://meteobahia.com.ar/scripts/xml/now-${city.code}.xml?_=${new Date().getTime()}`
                    setLoadingCurrent(true)
                    fetchXML(nowUrl)
                        .then(res => {
                            setCurrentForecast(res.response)
                            console.log("res.response: ", res.response)
                        })
                        .finally(() => { setLoadingCurrent(false) })

                })
                .finally(() => { setLoadingCurrent(false) })
        }
    }



    useEffect(() => {
        if (selectedCity) {
            setLoadingCurrent(true)
            console.log("Fetching meteogram")
            const meteogramUrl = `https://meteobahia.com.ar/scripts/meteogramas/${selectedCity.code}.xml`
            fetchXML(meteogramUrl)
                .then(res => {

                    const data = res.weatherdata
                    const agrupadosPorDia = agruparPorDia(data.forecast.tabular.time)
                    const resultadoFinal = Object.values(agrupadosPorDia)

                    const x = resultadoFinal.map((day, i) => {
                        return {
                            weather: day,
                            title: formatearFecha(day[0]["@_from"]),
                            title2: formatearFecha(day[0]["@_from"]).slice(0, 3).replace("Mañ", "Mañana"),
                            date: day[0]["@_from"],
                        }
                    })

                    x.pop()
                    setDailyForecast(x)


                })
                .catch(error => {
                    setError(error.message)
                    console.log(error)
                })
                .finally(() => setLoadingMeteogram(false))
        }
    }, [selectedCity])




    useEffect(() => {

        _fetchCityWeather()
        let interval = setInterval(() => {
            _fetchCityWeather()
        }, 1000 * 60 * 10);
        return () => clearInterval(interval)

    }, [selectedCity])


    useEffect(() => {

        getCity().then(res => setSelectedCity(res))

    }, [])

    if (error)
        return <Text style={s.error} onPress={() => { setSelectedCity(selectedCity) }}>No se pudo obtener el clima</Text>



    return (
        <View style={s.container}>


            <SelectCityModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                loadingCurrent={loadingCurrent}
                setLoadingCurrent={setLoadingCurrent}
                currentForecast={currentForecast}
                setCurrentForecast={setCurrentForecast}
            />


            <DayModalOverview
                dayModalVisible={dayModalVisible}
                setDayModalVisible={setDayModalVisible}
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                dailyForecast={dailyForecast}
            />

            {
                selectedCity ?
                    <>
                        {
                            loadingCurrent ?

                                <Text style={s.loading}>Cargando...</Text>
                                :
                                <CurrentWeather
                                    modalVisible={modalVisible}
                                    setModalVisible={setModalVisible}
                                    currentForecast={currentForecast}
                                />
                        }

                        {
                            loadingMeteogram ?
                                <Text style={s.loading}>Cargando...</Text>
                                :
                                <ForecastScroll
                                    dailyForecast={dailyForecast}
                                    setDayModalVisible={setDayModalVisible}
                                    setSelectedDayIndex={setSelectedDayIndex}
                                />
                        }
                    </>
                    :
                    <TouchableNativeFeedback onPress={() => { setModalVisible(true) }}>
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
        justifyContent: "flex-start",
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
    },
    error: {
        color: "red",
        textAlign: "center",
        fontSize: 13,
        fontFamily: 'Arial',

    },
    loading: {
        color: "red",
        fontSize: 12,
        textAlign: "center",
        width: 105
    }

})