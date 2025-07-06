import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';

const IMG_SIZE = 20

const WebViewImage = ({ icon }) => {

    const html = `
    <html>
          <body style="margin:0;background:transparent;">
            <img src="https://corsproxy.io/?https://www.meteobahia.com.ar/imagenes/new/${icon}.png?_=${new Date().getHours()}" 
            style="display:block;margin:auto;width:100vw;height:90vh;" />
        </body>
    </html>
  `;


    return (
        <View>
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
        </View>
    )
}

export default WebViewImage

const s = StyleSheet.create({
    webview: {
        width: IMG_SIZE,
        height: IMG_SIZE,
        display: "block",
    },
})