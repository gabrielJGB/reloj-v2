import { Button, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font';
import Clock from '../components/Clock'
import Header from '../components/Header';
import Weather from '../components/WeatherContainer';
import Buttons from '../components/Buttons';


const Home = () => {

    const { push } = useRouter()

    const [loaded] = useFonts({
        'digital-7': require('../assets/fonts/digital-7.ttf'),
        'digital-7-mono': require('../assets/fonts/digital-7-mono.ttf'),
        'digital-7-mono-italic': require('../assets/fonts/digital-7-mono-italic.ttf'),
    });

    return (
        <View style={s.container}>

            <Buttons/>
            {/* <Header /> */}
            <Clock />
            <Weather />

        </View>
    )
}

export default Home

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap:10,
    },

})