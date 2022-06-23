import React from 'react'
import FormContext from './form/ContextX';
import ComponentX from './form/ComponentX'
import ButtonX from './form/ButtonX';
import TextInputX from './form/TextInputX';
import CounterX from './form/CounterX';
import { View, ViewProps } from 'react-native';

const ValidatorX = {
    email: { regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, msg: 'hatali mail' },
    password: { regex: /.{6,}/, msg: 'hatali sifre' }
}

class FormX extends React.Component<{ onSubmit: Function, beforeSubmit?: Function } & ViewProps, any> {
    items: { [key: string]: ComponentX<any, any> } = {};
    constructor(props: any) {
        super(props);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
        this.serialize = this.serialize.bind(this);
    }
    registerInput(input: ComponentX<any, any>) {
        const inputNameBase = input.name ? input.name : input.constructor.name;
        let inputName = inputNameBase;
        let inputIndex = 0;
        while (this.items[inputName]) {
            inputName = inputNameBase + '_' + ++inputIndex;
        }
        __DEV__ && inputIndex > 0 && console.log('FormX : Duplicated Input Id [' + inputNameBase + ']');

        this.items[inputName] = input;
        return inputName;
    }
    validate() {
        const isOk = Object.values(this.items).reduce<boolean>((prev, item) => prev && item.validate(), true);
        return isOk;
    }
    serialize() {
        let tmpForm: { [key: string]: any } = {};
        Object.values(this.items).forEach(item => this.items[item.name].addToForm && (tmpForm[item.name] = item.state.value));
        return tmpForm;
    }
    async submit() {
        if (!this.validate())
            return false;
        else {
            if (this.props.beforeSubmit) {
                return await this.props.beforeSubmit() && await this.props.onSubmit(this.serialize())
            } else {
                return await this.props.onSubmit(this.serialize());
            }
        }
    }
    render() {
        return (
            <FormContext.Provider value={this} >
                <View {...this.props}>
                    {this.props.children}
                </View>
            </FormContext.Provider>
        )
    }
}

type Interface<T> = { [P in keyof T]: T[P] }
export interface FormXInterface extends Interface<FormX> { }

export { FormX, TextInputX, ValidatorX, CounterX, ButtonX }