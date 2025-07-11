import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import Clock from '../components/Clock'
import Weather from '../components/WeatherContainer';
import Buttons from '../components/Buttons';
import { useEffect, useState } from 'react';
import CurrentBrightness from '../components/CurrentBrightness';
import * as Brightness from 'expo-brightness';
import CurrentBattery from '../components/CurrentBattery';
import { IconButton } from 'react-native-paper';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';


const Home = () => {


    const [brightness, setBrightness] = useState(1);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
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
        const brilloRef = ref(db, 'brillo');
        const unsubscribe = onValue(brilloRef, async (snapshot) => {

            const data = snapshot.val();
            if (data && data.value !== undefined) {
                const newValue = data.value/100
                await Brightness.setBrightnessAsync(newValue);
                setBrightness(newValue)
            }
        });

        return () => unsubscribe();
    }, []);


    if (!loaded)
        return <Text></Text>

    return (
        <View style={s.container}>

            <View style={s.information}>
                <CurrentBrightness brightness={brightness} />
                <CurrentBattery />
            </View>

            <Buttons brightness={brightness} setBrightness={setBrightness} />
            <Clock />
            <Weather selectedDayIndex={selectedDayIndex} setSelectedDayIndex={setSelectedDayIndex} />

        </View>
    )
}

export default Home

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 8,
    },
    information: {
        position: "absolute",
        top: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingHorizontal: 3,
    }

})