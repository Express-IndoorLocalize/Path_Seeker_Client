import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    primary: '#242760',
    secondary: '#544C4C',
    white: '#FFFFFF',
    black: '#000000',
    gray: 'rgba(36, 39, 96, 0.05)',
    grey: '#CCCCCC',
    secondaryGray: 'rgba(84, 76, 76, 0.14)',
    cusColor1: '#3b2460',
    cusColor2: '#4d2460',
    cusColor3: '#582460',
    cusColor4: '#244060',
    cusColor5: '#405063',
    cusColor6: '#405863',
    cusColor7: '#493e57',
    cusColor8: '#363f4a',
    cusColorr1: '#3498db',
    cusColorr2: '#5DADE2',
    cusColorr3: '#2980B9',
    cusColorr4: '#21618C',
    cusColorr5: '#001F3F',
    cusColorr6: '#2C3E50',
    cusColorr7: '#001F3F',
    cusColorr8: '#192A4F',

    DEFAULT: '#172B4D',
    PRIMARY: '#5E72E4',
    SECONDARY: '#F7FAFC',
    LABEL: '#FE2472',
    INFO: '#11CDEF',
    ERROR: '#F5365C',
    SUCCESS: '#2DCE89',
    WARNING: '#FB6340',
    /*not yet changed */
    MUTED: '#ADB5BD',
    INPUT: '#DCDCDC',
    INPUT_SUCCESS: '#7BDEB2',
    INPUT_ERROR: '#FCB3A4',
    ACTIVE: '#5E72E4', //same as primary
    BUTTON_COLOR: '#9C26B0', //wtf
    PLACEHOLDER: '#9FA5AA',
    SWITCH_ON: '#5E72E4',
    SWITCH_OFF: '#D4D9DD',
    GRADIENT_START: '#6B24AA',
    GRADIENT_END: '#AC2688',
    PRICE_COLOR: '#EAD5FB',
    BORDER_COLOR: '#E7E7E7',
    BLOCK: '#E7E7E7',
    ICON: '#172B4D',
    HEADER: '#525F7F',
    BORDER: '#CAD1D7',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
}

export const linearColorsLight = [
    COLORS.cusColorr1,
    COLORS.cusColorr2,
    COLORS.cusColorr3,
    COLORS.cusColorr4,
]

export const linearColorsDark = [
    COLORS.cusColorr5,
    COLORS.cusColorr6,
    COLORS.cusColorr7,
    COLORS.cusColorr8,
]

export const dayNightColor = ["#018c6e","#016194"]

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 20,
    h3: 18,
    h4: 16,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontWeight: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontWeight: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontWeight: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontWeight: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontWeight: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontWeight: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontWeight: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontWeight: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontWeight: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme