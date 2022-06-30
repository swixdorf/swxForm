import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import ComponentX, { tValidators } from "./ComponentX";
class TextInputX extends ComponentX<{ validators?: tValidators, style?: { container?: ViewStyle, input?: ViewStyle & any } } & TextInputProps, any> {
    p: any;
    constructor(props: any) {
        super(props);
        this.p = { ...this.props, style: {} };
        this.p.value && delete this.p.value;
    }
    render() {
        const { placeholder, style } = this.props;
        const { hasError, value } = this.state;
        return (
            <View style={[style?.container]}>
                {!!value && <Text style={{ position: 'absolute', zIndex: 999, top: -10, paddingLeft: 5, paddingRight: 10, marginRight: 'auto' }}>{placeholder}</Text>}
                {!!hasError && <Text style={{ position: 'absolute', zIndex: 999, top: -5, right: 0, paddingLeft: 5, paddingRight: 10, marginLeft: 'auto', color: 'red' }}>{hasError}</Text>}
                <TextInput
                    onChangeText={(value) => { this.setState({ value }); hasError && this.validate() }}
                    onBlur={this.validate}
                    placeholder={placeholder}
                    style={[{ height: 44, backgroundColor: '#fff', color: 'black', borderWidth: 2 }, style?.input]}
                    value={value}
                    {...this.p}
                />
                <View style={{ borderBottomWidth: 2, borderBottomColor: 'lightgrey', position: 'absolute', bottom: 12,width:"100%" }} />
            </View>
        );
    }
}

export default TextInputX