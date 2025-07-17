import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import WebView from 'react-native-webview'
import { mainColor } from '../data/constants'

const IMG_SIZE = 62

const CurrentWeather = ({ modalVisible, setModalVisible, currentForecast }) => {

    const fontSize = 160
    const lineHeight = fontSize * 0.72
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
                        <Text style={{ fontSize: 85, lineHeight: 70, color: mainColor, textshadowColor: mainColor }}>°</Text>
                    </View>
                </View>

                <View style={s.conditionContainer}>
                    <Text style={s.condition}>{condition}</Text>
                    <Text style={s.condition}>Actualizado a las {time}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

export default CurrentWeather

const s = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 0

    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingLeft: 5,

    },
    webviewContainer: {
        minHeight: 90,
        backgroundColor: "orange"
    },
    webview: {
        width: IMG_SIZE + 44,
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
        textshadowColor: mainColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
        color: mainColor,
        
    },
    condition: {
        color: "white",
        fontSize: 11,
        fontFamily: 'Arial',
        paddingLeft: 12,
        color: mainColor,
        textAlign: "left"
    },
    conditionContainer:{
        display:"flex",
        flexDirection:"column",
        gap:0,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginTop:2

    }

})