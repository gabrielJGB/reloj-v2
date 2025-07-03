import { Modal, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'



const Settings = () => {



  return (
    <View style={s.container}>

      
 
    </View>
  )
}

export default Settings

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  button: {
    width: "100%"
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 17
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1c1c1c"
  }
})