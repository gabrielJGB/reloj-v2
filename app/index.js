import { StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
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
import ServerModal from '../components/ServerModal';


const Home = () => {


    const [brightness, setBrightness] = useState(1);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [serverModalVisible, setServerModalVisible] = useState(false)
    const [serverIP, setServerIP] = useState("192.168.100.28")
    const [serverConnected, setServerConnected] = useState(false)
    const [serverStatus, setServerStatus] = useState("")


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
        connectWebSocket();
    }, [serverIP, serverConnected]);



    let ws;

    const connectWebSocket = () => {

        ws = new WebSocket("ws://" + serverIP + ':8080');



        ws.onopen = (e) => {

            console.log('Conectado al servidor');
            setServerStatus('✅ Conectado al servidor');
            setServerConnected(true)
        };


        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.type === 'brightness') {
                Brightness.setBrightnessAsync(msg.value);
                setBrightness(msg.value)
            }
        };

        ws.onclose = (e) => {


            console.log('🔁 Conexión cerrada, intentando reconectar...');
            setServerStatus('Conexión cerrada, intentando reconectar...')
            setTimeout(connectWebSocket, 3000); // Reintenta en 3 segundos

        };

        ws.onerror = (e) => {
            console.log('⚠️ Error WebSocket:', e.message);
            setServerStatus('Error WebSocket:', e.message)
            ws.close(); // fuerza reconexión
            setServerConnected(false)
        };
    };




    if (!loaded)
        return <Text></Text>

    return (
        <View style={s.container}>
            <ServerModal
                setServerModalVisible={setServerModalVisible}
                serverModalVisible={serverModalVisible}
                serverIP={serverIP}
                setServerIP={setServerIP}
                serverConnected={serverConnected}
                setServerConnected={setServerConnected}
                serverStatus={serverStatus}
            />

            <View style={s.information}>
                <CurrentBrightness brightness={brightness} />
                <CurrentBattery />
                <IconButton icon={serverConnected ? "access-point" : "access-point-off"} size={25} iconColor={serverConnected ? "rgb(0,70,0)" : "rgb(70,0,0)"} rippleColor={"gray"} onPress={() => { setServerModalVisible(!serverModalVisible) }} />
                {/* wifi-off / wifi-sync */}
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
        // backgroundColor: "yellow",
        margin: "auto",
        // flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        gap: 8,
        // height: "100%"
        // gap: 10,
        // display:"flex",
        // alignItems:"stretch",
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