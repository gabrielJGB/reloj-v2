
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'

const Clock = () => {

  const [hours, setHours] = useState('--')
  const [minutes, setMinutes] = useState('--')
  const [seconds, setSeconds] = useState('--')


  useFocusEffect(useCallback(() => {

    const interval = setInterval(async () => {
      const date = new Date()
      const _hours = String(date.getHours()).padStart(2, "0")
      const _minutes = String(date.getMinutes()).padStart(2, "0")
      const _seconds = String(date.getSeconds()).padStart(2, "0")
      setHours(_hours)
      setMinutes(_minutes)
      setSeconds(_seconds)
      setToggleDot(prev => !prev)

    }, 1000);

    return () => clearInterval(interval);
  }, []))


  return (
    <View style={s.clock}>

      <Text style={[s.numbers, { color: "red", textShadowColor: "red" }]}>{hours}</Text>
      <Text style={[s.dots, { color: "red" , textShadowColor: "red" }]}>:</Text>
      <Text style={[s.numbers, { color: "red", textShadowColor: "red" }]}>{minutes}</Text>
      <Text style={[s.seconds, { color: "red", textShadowColor: "red" }]}>{seconds}</Text>

    </View>
  )
}

export default Clock

const s = StyleSheet.create({

  clock: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    // backgroundColor:"#1c1c1c"
  },
  numbers: {

    color: "red",
    transform: [{ rotate: '0deg' }],
    textAlign: "center",
    fontFamily: 'digital-7-mono-italic',
    textShadowColor: 'red',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 17,
    fontSize: 310,
    lineHeight:250
  },
  seconds: {

    fontSize: 110,
    paddingLeft: 10,
    paddingBottom: 10,
    alignSelf: "flex-end",
    color: "red",
    transform: [{ rotate: '0deg' }],
    textAlign: "center",
    fontFamily: 'digital-7-mono-italic',
    textShadowColor: 'red',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7
  },
  dots: {
    textAlign: "center",
    fontSize: 120,
    color: "red",
    paddingHorizontal: 12
  },
 
});
