import React from 'react'
import { ColorValue, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import ComponentX, { ComponentXProps } from './ComponentX';

type ButtonColor = {
    container: ColorValue,
    text: ColorValue,
    border?: ColorValue
}
const predefinedColors = {
    'orange': { container: '#FF8D15', text: "#FFF" },
    'green': { container: '#28A745', text: "#FFF" },
    'blue': { container: '#0085b2', text: "#FFF" },
    'red': { container: '#CC0000', text: "#FFF" },
    'black': { container: '#3C3C3C', text: "#FFF" },
    'white': { container: '#FFF', text: "#000", border: '#D9D9D9' },
    'disabled': { container: '#E0E0E0', text: '#000' }
}
interface ButtonXProps extends ComponentXProps {
    color?: keyof typeof predefinedColors | ButtonColor
    title?: string
    disabled?: boolean
    onPress?: Function
    style?: {
        container?: ViewStyle
        text?: TextStyle
    },
    children?: any
}
class ButtonX extends ComponentX<ButtonXProps, any> {
    constructor(props: any) {
        super(props);
        this.btnPress = this.btnPress.bind(this);
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);


        let color;
        if (this.props.disabled) {
            color = predefinedColors.disabled;
        }
        else if (this.props.color === undefined) {
            color = predefinedColors.white;
        }
        else if (typeof this.props.color == 'string') {
            color = predefinedColors[this.props.color];
        }
        else
            color = this.props.color;

        this.state = { disabled: !!this.props.disabled, color }
    }
    componentDidMount() {

    }
    btnPress() {
        //@ts-ignore
        this.context && this.context.submit();
    }
    enable() {
        if (this.state.disabled) {
            const prevColor = this.state.prevColor;
            const color = prevColor ? prevColor : predefinedColors.white;
            this.setState({ disabled: false, color, prevColor: null });
        }
    }
    disable() {
        if (!this.state.disabled) {
            const prevColor = this.state.color;
            this.setState({ disabled: true, color: predefinedColors.disabled, prevColor });
        }
    }
    render() {
        const { title, onPress, style } = this.props;
        const { disabled, color } = this.state;
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: color.container,
                    borderWidth: color.border ? 1 : 0,
                    borderColor: color.border ? color.border : '#fff',
                    height: 48,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                    ...style?.container
                }}
                onPress={() => { !disabled && (onPress ? onPress(this) : this.btnPress()) }}>
                {
                    this.props.children ||
                    <Text
                        style={{
                            color: color.text, fontSize: 14,
                            letterSpacing: 0.20,
                            ...style?.text
                        }}>
                        {title}
                    </Text>
                }
            </TouchableOpacity >
        )
    }
}

export default ButtonX