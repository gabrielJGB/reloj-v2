import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ServerModal = ({serverModalVisible,setServerModalVisible}) => {



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={serverModalVisible}
            onRequestClose={() => { setDayModalVisible(!setServerModalVisible) }}

        >
            <View style={s.container}>

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
})