import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import WebView from 'react-native-webview'

const IMG_SIZE = 62

const CurrentWeather = ({ modalVisible, setModalVisible, currentForecast }) => {

    const fontSize = 150
    const lineHeight = fontSize * 0.8
    const temp = currentForecast?.cc?.temp
    const icon = currentForecast?.cc?.icon
    const condition = currentForecast?.cc?.condition
    const time = currentForecast?.cc?.time

    const html = `
    <html>
          <body style="margin:0;background:transparent;">
            <img src="https://corsproxy.io/?https://www.meteobahia.com.ar/imagenes/new/${icon}.png?_=${new Date().getHours()}" 
            style="display:block;margin:auto;width:100vw;height:90vh;" />
        </body>
    </html>
  `;


    return (
        <TouchableNativeFeedback onPress={() => { setModalVisible(!modalVisible) }}>
            <View style={s.mainContainer}>
                <View style={s.container}>
                    <View style={s.icon}>
                        {
                            Platform.OS != "web" ?
                                <WebView
                                    originWhitelist={['*']}
                                    source={{ html }}
                                    style={s.webview}
                                    domStorageEnabled
                                    scrollEnabled={false}
                                    scalesPageToFit={false}
                                    automaticallyAdjustContentInsets={false}
                                    overScrollMode="never"
                                    backgroundColor="transparent"
                                />
                                :

                                <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${icon}.png` }} style={s.img} />

                        }

                    </View>
                    <View style={s.tempCont}>
                        <Text style={[s.temp, { fontSize, lineHeight }]}>{Math.round(temp)}</Text>
                        <Text style={{ fontSize: 85, lineHeight: 70, color: "red", textShadowColor: 'red' }}>°</Text>
                    </View>
                </View>
                <Text style={s.condition}>
                    {time} - {condition}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default CurrentWeather

const s = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",

    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 0,
        paddingLeft: 5,
        // backgroundColor:"orange"
    },
    webviewContainer: {
        minHeight: 90
    },
    webview: {
        width: IMG_SIZE + 38,
        height: IMG_SIZE,
        backgroundColor: "transparent",
        minHeight: 90,

    },
    tempCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    temp: {
        fontFamily: 'digital-7-mono-italic',
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
        color: "red",
        fontSize: 160,
        lineHeight: 130,
        // backgroundColor:"yellow"
    },
    condition: { color: "white", fontSize: 15, fontFamily: 'digital-7-mono-italic', paddingLeft: 18, paddingBottom: 5, color: "red", textAlign: "left" }
    // icon: {
    //     width: 90,
    //     height: 90,
    //     borderRadius: 90,
    //     backgroundColor: "blue"
    // }
})