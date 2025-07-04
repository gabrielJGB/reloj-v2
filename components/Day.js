import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

const Day = ({ date, maxTemp, rain, minTemp, condition }) => {

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Text style={[s.text, s.date]}>{date}</Text>
                { rain >0 && <Icon source={"water"} color="aqua" size={8} /> }
            </View>


            <View style={s.numbers}>
                <Text style={[s.text, s.temp]}>{maxTemp}°</Text>
                <Text style={[s.text, s.slash]}>/</Text>
                <Text style={[s.text, s.temp, { color: "rgb(100,100,170)", textShadowColor: "rgb(100,100,170)" }]}>{minTemp}°</Text>
            </View>

            <Text numberOfLines={2} style={[s.text, s.condition]}>{condition} {rain>0 &&  `\n${rain} mm` } </Text>

        </View >
    )
}

export default Day

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 13,
        alignSelf: "stretch",

        borderRightWidth: 2,
        alignItems: "center",
        paddingRight: 10,
        paddingLeft: 0,
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
        fontSize: 18
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3
    }
})