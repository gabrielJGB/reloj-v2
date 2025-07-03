import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const SelectCityModal = ({ modalVisible, setModalVisible }) => {




    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible) }}
        >
            <View style={s.centeredView}>
                <View style={s.modalView}>
                    <Text style={s.modalText}>Seleccionar ubicacion</Text>
                    <Pressable
                        style={[s.button, s.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={s.textStyle}>Cerrar</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>

    )
}

export default SelectCityModal

const s = StyleSheet.create({
    centeredView: {
        
        height:"90%",
        width:"90%",
        borderRadius:20,
        backgroundColor: 'rgba(255,255,2555,0.9)',
        marginHorizontal:"auto",
        marginVertical:"auto",
    },
    modalView: {
        flex:1,
        
        
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        
        textAlign: 'center',
    },
});