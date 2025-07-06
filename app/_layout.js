import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Stack, useFocusEffect } from 'expo-router'
import { DarkTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState } from 'react'


const Layout = () => {


    useKeepAwake();


    useEffect(() => {

        const hideUI = async () => {
            StatusBar.setHidden(true)
            StatusBar.setTranslucent(true)
            await NavigationBar.setVisibilityAsync("hidden")
            await NavigationBar.setVisibilityAsync('hidden');
            await NavigationBar.setBackgroundColorAsync('transparent');
            await NavigationBar.setButtonStyleAsync('dark');
        };

        hideUI()
        hideUI()

    }, []);

    return (

        <ThemeProvider value={DarkTheme}>
            <StatusBar hidden={true} backgroundColor={"transparent"} />
            <Stack
                screenOptions={{
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='settings' options={{ headerShown: true, title: "Configuración" }} />


            </Stack>
        </ThemeProvider>

    )
}

export default Layout

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