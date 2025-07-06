import { Alert, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { Icon, Dialog, TouchableRipple } from 'react-native-paper'
import { findMinMaxTemperature, sumPrecipitation } from '../utils/helpers'


const Day = ({ dailyForecast,setSelectedDayIndex, setSelectedDayForecast,setDayModalVisible, index }) => {

    const date =  dailyForecast[index].title.replace("á", "A").replace("é", "E") 
    const maxTemp =  Math.round(findMinMaxTemperature(dailyForecast[index]?.weather).maxTemp.value) 
    const minTemp =  Math.round(findMinMaxTemperature(dailyForecast[index]?.weather).minTemp.value) 
    const condition =  dailyForecast[index].weather[0]["symbol"]["@_name"].replace(" ", "\n") 
    const rain =  sumPrecipitation(dailyForecast[index]?.weather) 
    const forecast =  dailyForecast[index].weather 


    

    return (

        <TouchableRipple
            unstable_pressDelay={50}
            rippleColor={"rgba(255,0,0,0.3)"}
            style={s.container}
            onPress={() => {
                // setSelectedDayForecast({
                //     forecast, maxTemp, minTemp, date, rain, index
                // })
                setSelectedDayIndex(index)
                setDayModalVisible(prev => !prev)

            }}>

            <>

                <View style={s.header}>
                    <Text style={[s.text, s.date]}>{date}</Text>
                    {rain > 0 && <Icon source={"water"} color="aqua" size={8} />}
                </View>


                <View style={s.numbers}>
                    <Text style={[s.text, s.temp]}>{maxTemp}°</Text>
                    <Text style={[s.text, s.slash]}>/</Text>
                    <Text style={[s.text, s.temp, { color: "rgb(100,100,170)", textShadowColor: "rgb(100,100,170)" }]}>{minTemp}°</Text>
                </View>

                <Text numberOfLines={3} style={[s.text, s.condition]}>{condition} {rain > 0 && `\n${rain.toFixed(1)} mm`} </Text>

            </ >
        </TouchableRipple>
    )
}

export default Day

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 10,
        alignSelf: "stretch",
        // backgroundColor:"blue",
        minWidth: 120,
        borderRightWidth: 2,
        alignItems: "center",
        paddingTop:2,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "#53000f",
    },
    numbers: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontFamily: 'digital-7-mono-italic',
        color: "red",
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
    },
    date: {
        fontSize: 24
    },
    temp: {
        fontSize: 40
    },
    slash: {
        fontSize: 20
    },
    condition: {
        maxWidth: 120,
        textAlign: "center",
        fontSize: 14,
        fontStyle: "italic",
        fontFamily: "Arial"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3
    }
})