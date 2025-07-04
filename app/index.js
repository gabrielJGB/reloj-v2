import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from 'expo-navigation-bar';
import Clock from '../components/Clock'
import Header from '../components/Header';
import Weather from '../components/WeatherContainer';
import Buttons from '../components/Buttons';
import { useEffect, useState } from 'react';
import CurrentBrightness from '../components/CurrentBrightness';



const Home = () => {

    const { push } = useRouter()
    const [brightness, setBrightness] = useState(1);

    const [loaded] = useFonts({
        'digital-7': require('../assets/fonts/digital-7.ttf'),
        'digital-7-mono': require('../assets/fonts/digital-7-mono.ttf'),
        'digital-7-mono-italic': require('../assets/fonts/digital-7-mono-italic.ttf'),
    });


    useEffect(() => {

        const setRotate = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE
            );
        }

        setRotate()


    }, [])



    useEffect(() => {

        const initBrightness = async () => {
            const { granted } = await Brightness.requestPermissionsAsync();
            if (granted) {
                const current = await Brightness.getBrightnessAsync();
                setBrightness(current)

            }
        };

        initBrightness();

    }, []);



    useEffect(() => {

            const hideUI = async () => {
        
                // await NavigationBar.setBackgroundColorAsync('transparent');
                await NavigationBar.setVisibilityAsync('hidden');
                await NavigationBar.setButtonStyleAsync('dark');
            };
            StatusBar.setHidden(true, 'fade');        
            hideUI()
            hideUI()

    }, []);



    if (!loaded)
        return <Text></Text>

    return (
        <View style={s.container}>

            <Buttons brightness={brightness} setBrightness={setBrightness} />
            {/* <CurrentBrigthness  brightness={brightness} /> */}
            <CurrentBrightness brightness={brightness}/>
            <Clock />
            <Weather />

        </View>
    )
}

export default Home

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "yellow",
        margin: "auto",
        // flex: 1,
        alignItems: "center",
        justifyContent:"space-around",
        gap:0,
        height:"100%"
        // gap: 10,
        // display:"flex",
        // alignItems:"stretch",
    },

})