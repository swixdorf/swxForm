import React from "react"
import { FlexStyle, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import ComponentX from "./ComponentX"
class CounterX extends ComponentX<{ name?: string, defaultValue?: string, onChange?: Function, style?: FlexStyle, min?: number, max?: number }, any> {

    render() {
        const { name, defaultValue, onChange, style, min = 1, max = 999 } = this.props
        return (
            <View style={[styles.counterBox, style]}>
                <TouchableOpacity onPress={() => { }} style={styles.counterButton}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>−</Text>
                </TouchableOpacity>
                <View style={styles.counterMid}>
                    <TextInput onBlur={() => { }} style={{ textAlign: 'center' }} value={'1'} onChangeText={() => { }} keyboardType={'number-pad'} selectTextOnFocus={true} />
                </View>
                <TouchableOpacity onPress={() => { }} style={styles.counterButton}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    counterBox: {
        backgroundColor: '#D0D0D0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#D0D0D0'
    },
    counterIcon: {
        padding: 5,
    },
    minus: {
        paddingLeft: '10%'
    },
    plus: {
        paddingRight: '10%'
    },
    counterMid: {
        backgroundColor: '#FFF',
        flex: 1
    },
    counterButton:
    {
        flex: 1,
        alignItems: 'center',
    }
})

export default CounterX