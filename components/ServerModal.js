import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, Icon, IconButton, TextInput } from 'react-native-paper'

const ServerModal = ({ serverModalVisible, setServerModalVisible, serverIP, setServerIP, serverConnected, setServerConnected,serverStatus }) => {

    const textInput = useRef()
    const [text, setText] = useState(serverIP);


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={serverModalVisible}
            onRequestClose={() => { setServerModalVisible(!serverModalVisible) }}

        >
            <View style={s.container}>

                <View style={s.header}>

                    <Text style={s.status}>El sevidor esta {serverConnected ? "ON" : "OFF"}</Text>
                    <IconButton icon={"close-box"} size={40} iconColor='white' rippleColor={"white"} onPress={() => { setServerModalVisible(false) }} />
                </View>

                <View style={s.body}>

                    <View style={s.box}>
                        <TextInput
                            ref={textInput}
                            label="IP del servidor"
                            value={text.toLowerCase()}
                            keyboardType='default'
                            activeUnderlineColor={"red"}
                            style={{ backgroundColor: "#121212", width: "70%" }}
                            textColor='white'
                            placeholderTextColor='white'
                            onChangeText={text => setText(text)}
                        // right={<TextInput.Icon icon="access-point" color="grey" onPress={() => { 
                        //     setServerIP(text) 
                        //     setServerConnected(true)
                        // }} />}
                        />
                        {
                            
                            <Button buttonColor='red' textColor='white' onPress={() => {
                                setServerIP(text)
                                
                            }}
                            >Establecer</Button>
                        }
                    </View>

                    {
                        
                        <View style={s.connected}>
                            <View style={s.box}>
                                <Text style={s.text}>{serverStatus}</Text>
                                <Icon source={serverConnected ? "access-point" : "access-point-off"} size={35} color={serverConnected ? "rgb(0,70,0)" : "rgb(70,0,0)"} />
                                {/* <Button buttonColor='red' textColor='white' onPress={() => {
                                    setServerIP(text)
                                    setServerConnected(false)
                                }}
                                >Desconectar</Button> */}
                            </View>
                        </View>
                    }
                </View>

            </View>
        </Modal>
    )
}

export default ServerModal

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        borderColor: "rgb(70,70,70)",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.94)',
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,

    },
    status: {
        paddingLeft: 20,
        color: "white",
        fontSize: 24
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    body: {
        flex: 1,
        padding: 20,
        // backgroundColor: "navy"
        // justifyContent:"center",
        // alignItems:"center"
    },
    text: {
        paddingVertical: 10,
        color: "white"
    },
    connected: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    box: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",

    }
})