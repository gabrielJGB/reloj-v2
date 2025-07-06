import { Dimensions, Modal, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Icon, IconButton } from 'react-native-paper'
import { LineChart } from 'react-native-gifted-charts'
import { Image } from 'expo-image'




const DayModalOverview = ({ dayModalVisible, setDayModalVisible, selectedDayForecast }) => {

    const { date, forecast, maxTemp, minTemp, index } = selectedDayForecast
    const graphWidth = Dimensions.get("window").width - 50


    const tempData = forecast?.map((elem) => {

        const temp = parseFloat(elem.temperature["@_value"])
        const uri = `https://corsproxy.io/?https://www.meteobahia.com.ar/imagenes/new/${elem.symbol["@_number"]}.png`
        const icon = elem.symbol["@_number"]
        const condition = elem.symbol["@_name"]
        const ICON_SIZE = 32


        return {

            main: {
                value: temp,
                label: elem["@_from"].split("T")[1],
                labelTextStyle: s.graphlabel,
                // customDataPoint:customDataPoint,
                dataPointText: `${String(Math.round(elem.temperature["@_value"]))}°`,

                dataPointLabelComponent: (e) => {
                    return (
                        <View style={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}>
                            <Image source={{ uri }} style={{ height: ICON_SIZE, width: ICON_SIZE }} cachePolicy={"disk"} />
                        </View>
                    )
                }

            },
            temp: {
                value: temp,
                dataPointText: `${String(Math.round(elem.temperature["@_value"]))}°`,
            },
            rain: {
                value: parseFloat(elem.precipitation["@_value"]) / 3,
                dataPointText: parseFloat(elem.precipitation["@_value"]) === 0 ? "" : parseFloat(elem.precipitation["@_value"]) + "mm",
            }

        }


    })




    if (forecast === undefined)
        return <View></View>

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={dayModalVisible}
            onRequestClose={() => { setDayModalVisible(!dayModalVisible) }}

        >
            <TouchableNativeFeedback onPress={() => { setDayModalVisible(!dayModalVisible) }}>
                <View style={s.container}>
                    <View style={s.header}>

                        <IconButton
                            icon={"chevron-left"}
                            size={30}
                            iconColor={"white"}
                            onPress={() => { }}
                        />

                        <Text style={[s.text, s.date]}>{date}</Text>
                        <View style={s.tempContainer}>
                            <Text style={[s.temp, s.maxTemp]}>{maxTemp}°</Text>
                            <Text style={[s.text, { fontSize: 16 }]}>/</Text>
                            <Text style={[s.temp, s.minTemp]}>{minTemp}°</Text>
                        </View>

                        <IconButton 
                        icon={"chevron-right"} 
                        size={30} 
                        iconColor={"white"} 
                        onPress={() => { }} />

                        <IconButton icon={"close-box"} iconColor="white" size={35} onPress={() => { setDayModalVisible(!dayModalVisible) }} />
                    </View>

                    <LineChart
                        isAnimated
                        animateOnDataChange
                        animationDuration={1200}
                        onDataChangeAnimationDuration={100}
                        noOfSections={8}
                        maxValue={maxTemp + 3}


                        // highlightedRange={{
                        //     from: 2,
                        //     to: 5,
                        //     color: 'red',
                        //     thickness:2
                        // }}
                        areaChart3
                        startFillColor3='aqua'
                        endFillColor3='aqua'
                        textColor2='white'

                        textShiftY={-10}
                        textFontSize2={18}
                        data={tempData.map(e => (e.main))}
                        data2={tempData.map(e => (e.temp))}
                        data3={tempData.map(e => (e.rain))}
                        animateTogether
                        curved
                        curvature={0.1}
                        textColor='white'
                        zIndex1={10}
                        zIndex2={5}
                        zIndex3={4}
                        textFontSize={15}
                        textFontSize3={14}
                        thickness={3}
                        mostNegativeValue={-7}
                        adjustToWidth
                        lineGradient
                        lineGradientStartColor='#ed0c0c'
                        lineGradientEndColor='#00aaff'
                        rulesColor={"rgb(40,40,40)"}
                        xAxisLabelTextStyle={{ color: "white", fontSize: 11 }}
                        yAxisColor="rgb(50,50,50)"
                        xAxisColor="rgb(50,50,50)"
                        yAxisTextStyle={{ color: "grey", fontSize: 12 }}
                        color1="#ff3b3b"
                        spacing={graphWidth / 7.8}
                        showVerticalLines
                        dataPointsRadius3={0}
                        thickness3={1}
                        color3="aqua"
                        verticalLinesColor={"rgb(50,50,50)"}
                        verticalLinesThickness={1}
                        width={graphWidth}

                    />



                </View>
            </TouchableNativeFeedback>
        </Modal >
    )
}

export default DayModalOverview

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        borderColor: "rgb(70,70,70)",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.93)',
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,

    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 30
    },
    date: {
        fontSize: 35
    },
    text: {
        fontFamily: 'digital-7-mono-italic',
        color: "red",
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
    },
    tempContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2
    },
    temp: {
        fontFamily: 'digital-7-mono-italic',
        fontSize: 35,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 17,
        // textShadowOffset: { width: -1, height: -1 },
        // textShadowRadius: 1,

    },
    minTemp: {
        color: "rgb(100,100,170)",
        textShadowColor: "rgb(100,100,170)"
    },
    maxTemp: {
        color: "rgb(255,0,0)",
        textShadowColor: "rgb(255,0,0)",
    },
    graphlabel: {
        fontSize: 14,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    },
    img: {
        width: 32,
        height: 32,
    },
})