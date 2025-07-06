import { BatteryState, useBatteryLevel, useBatteryState } from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

function BatteryHookIndicator() {
  const batteryLevel = useBatteryLevel(); 
  const batteryState = useBatteryState();  
  const isCharging =  batteryState === BatteryState.CHARGING;
  
      return (
        <View style={s.container}>
            <Icon source={`${isCharging?"battery-charging":"battery"}`} color='rgb(50,50,50)' size={16} />
            <Text style={s.text}>
                {batteryLevel !== null && `${Math.round(batteryLevel * 100)}%`}
            </Text>
        </View>
    );
}

export default BatteryHookIndicator

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(50,50,50)"
    },
});
