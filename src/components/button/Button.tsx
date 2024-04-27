import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import {COLORS,dayNightColor} from '../../constants/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = (props:any) => {
    const filledBgColor:string = dayNightColor[1];
    const borderColor:string = '#000000';
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;
    const isCalibrate = props.isCalibrate ?? false;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ 
                backgroundColor: bgColor,
                borderColor: borderColor, 
                },
                ...props.style
            }}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={{ fontSize: 15, ... { color: textColor } }}>{props.title}</Text>
            {isCalibrate?<MaterialCommunityIcons name="target" color={'white'} size={23} style={{paddingLeft:5}}/>:<></>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button