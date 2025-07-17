
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { mainColor } from '../data/constants';
// import { mainColor } from '../data/constants';
 
const Clock = () => {

  const [hours, setHours] = useState('--')
  const [minutes, setMinutes] = useState('--')
  const [seconds, setSeconds] = useState('--')

  const width = Dimensions.get("window").width / 2.3

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

      <Text style={[s.numbers, { fontSize: width, lineHeight: width * 0.7 }]}>{hours}</Text>
      <Text style={[s.dots, { fontSize: width/2, lineHeight: width * 0.7 }]}>:</Text>
      <Text style={[s.numbers, { fontSize: width, lineHeight: width * 0.7 }]}>{minutes}</Text>
      <Text style={[s.seconds, { fontSize: width / 2.6, lineHeight: (width / 2) * 0.7 }]}>{seconds}</Text>

    </View>
  )
}

export default Clock

const s = StyleSheet.create({

  clock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    
  },
  numbers: {

    color: mainColor,
    fontFamily: 'digital-7-mono-italic',
    color: mainColor,
    textshadowColor: mainColor,  
    textShadowOffset: { width: 1 , height: 1 },
    textShadowRadius: 17,
    
  },
  seconds: {
    
    alignSelf: "flex-end",
    color: mainColor,
    transform: [{ rotate: '0deg' }],
    fontFamily: 'digital-7-mono-italic',
    textshadowColor: mainColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7
  },
  dots: {
    color: mainColor,
  },

});
