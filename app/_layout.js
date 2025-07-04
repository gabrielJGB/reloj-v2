import { StyleSheet, Text, View } from 'react-native'
import { Stack, useFocusEffect } from 'expo-router'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'

import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

const Home = () => {



    return (
        <ThemeProvider value={DarkTheme}>
            
            <StatusBar hidden />

            <Stack
                screenOptions={{
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='settings' options={{ headerShown: true ,title:"Configuración"}} />


            </Stack>
        </ThemeProvider>
    )
}

export default Home

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",

    },
    text: {
        color: "white",
        fontSize: 35
    }
})