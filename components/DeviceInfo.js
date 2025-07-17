import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { IconButton } from 'react-native-paper';
import * as Brightness from 'expo-brightness';
import { mainColor } from '../data/constants';


export default function App({ setBrightness }) {

    const [{ illuminance }, setData] = useState({ illuminance: 0 });
    const [subscription, setSubscription] = useState(null);



    const toggle = () => {
        if (subscription) {
            unsubscribe();
        } else {
            subscribe();
        }
    };



    const subscribe = () => {
        setSubscription(
            LightSensor.addListener(sensorData => {
                const illuminance = sensorData.illuminance

                setData(sensorData)
                if (illuminance === 0) {

                    changeBrigthness(0.3)

                } else if (illuminance > 0 && illuminance < 30) {

                    changeBrigthness(0.4)

                } else if (illuminance > 30 && illuminance < 70) {

                    changeBrigthness(0.6)

                } else if (illuminance > 70) {

                    changeBrigthness(0.9)

                }
            })
        );
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        subscribe();
        return () => unsubscribe();
    }, []);

    const changeBrigthness = async (newValue) => {
        

            await Brightness.setBrightnessAsync(newValue);
            setBrightness(newValue)
        
    }


    return (
        <View style={styles.sensor}>
            <IconButton
                icon={subscription ? "brightness-auto" : "brightness-percent"}
                size={22}
                rippleColor={mainColor}
                iconColor='rgb(50,50,50)' onPress={toggle}
            />
            <Text style={{ color: "gray", fontSize: 12 }}>{illuminance}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sensor: {
        paddingHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',

    },

});
