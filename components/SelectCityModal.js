import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import cities from '../data/cities.json'
import { Button, Dialog, Icon, PaperProvider, Portal, TextInput, TouchableRipple } from 'react-native-paper';
import { getCity, saveCity } from '../utils/storage';
import { useFocusEffect } from 'expo-router';
import { fetchXML } from '../utils/fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mainColor } from '../data/constants';

const SelectCityModal = ({ modalVisible, setModalVisible, selectedCity, setSelectedCity, loading, setLoading, currentForecast, setCurrentForecast }) => {


    const textInput = useRef()
    const [text, setText] = useState("");
    const [results, setResults] = useState([])
    // const [cityCodes, setSelectedCityCodes] = useState(false)


    useEffect(() => {

        if (text != "" && text.length > 1) {

            const resp = cities.filter(city => {

                const cityLower = city.nombre.toLowerCase()
                const provinceLower = city.provincia.toLowerCase()
                if (cityLower.includes(text) || provinceLower.includes(text)) {
                    return city
                }
            })

            setResults(resp)
        } else {
            setResults([])
        }

    }, [text])


    // const _getCityCodes = async () => {
    //     const codes = await getCityCodes()

    //     let arr = codes.map((code) => {
    //         return cities.find(city => city.code === code)
    //     })

    //     setSelectedCityCodes(arr)
    // }


    useFocusEffect(useCallback(() => {

        setText("")
        // _getCityCodes()

    }, [modalVisible]))



    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible) }}
        >

            <View style={s.centeredView}>
                <View style={s.container}>

                    <TextInput
                        ref={textInput}
                        label="Buscar una ciudad"
                        value={text.toLowerCase()}
                        activeUnderlineColor={mainColor}
                        style={{ backgroundColor: "#121212", borderTopEndRadius: 10, borderTopStartRadius: 10 }}
                        textColor='white'
                        placeholderTextColor='white'
                        onChangeText={text => setText(text)}

                    />

                    <ScrollView >
                        <View style={s.results}>

                            {
                                selectedCity != null &&
                                <Text style={{ color: "white", fontWeight: "500", fontSize: 16, lineHeight: 34 }}>
                                    Ubicación actual: {selectedCity.nombre}
                                </Text>
                            }

                            {
                                results.length > 0 &&

                                results.map((result, i) => (
                                    <TouchableRipple
                                        key={i}
                                        rippleColor={mainColor}
                                        unstable_pressDelay={80}
                                        borderless
                                        style={{ borderRadius: 7, paddingTop: !selectedCity ? 5 : 0 }}
                                        onPress={() => {
                                            saveCity(result)
                                            setSelectedCity(result)
                                            setModalVisible(false)

                                        }}

                                    >
                                        <View style={s.result}>
                                            <Icon source="map-marker" color='white' size={18} />
                                            <Text numberOfLines={1} style={s.resultText}>{result.nombre}, {result.provincia}</Text>
                                        </View>

                                    </TouchableRipple>
                                ))

                            }
                        </View>
                    </ScrollView>

                </View>

                <Button
                    onPress={() => setModalVisible(false)}
                    style={s.closeButton}
                    buttonColor='rgb(0,0,0)'
                    textColor='white'
                >Cerrar</Button>

            </View>

        </Modal>

    )
}

export default SelectCityModal

const s = StyleSheet.create({
    centeredView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderColor: "gray",
        borderWidth: 1,
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.9)',
        width: "90%",
        margin: "auto"

    },
    container: {
        flex: 1,
        flexDirection: "column",

    },

    results: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: "column",
        gap: 9,
        height: "80%"

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {

        textAlign: 'center',
    },


    noResults: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        marginVertical: 12
    },

    result: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 15,
        backgroundColor: "rgb(200,0,0)"
    },
    resultText: {
        fontWeight: "500",
        color: "white",
    },
    title: {
        color: "white",
        fontWeight: "500",
        fontSize: 15

    },
    closeButton: {
        padding: 5,
        borderTopWidth:1,
        borderColor:"#4c4c4c",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,

    }
});