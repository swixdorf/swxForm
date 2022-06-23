import React from 'react';
import FormContext from './ContextX';
type tValidators = [{ regex: RegExp, msg: string }] | { regex: RegExp, msg: string };
interface ComponentXProps {
    name?: string
    validators?: tValidators
    addToForm?: boolean
}
class ComponentX<P, S> extends React.Component<ComponentXProps & P, { value: any, hasError: any } & S> {
    static contextType = FormContext;
    name: string = '';
    addToForm: boolean = true;
    validators: [{ regex: RegExp, msg: string }];
    registerTimer;

    constructor(props: any) {
        super(props);
        this.state = { ...this.state, value: (props.value ? props.value : ''), hasError: '' };

        this.addToForm = this.props.addToForm !== undefined ? !!this.props.addToForm : this.addToForm;
        this.validators = props.validators ? (!(props.validators instanceof Array) ? [props.validators] : props.validators) : [];
        this.validate = this.validate.bind(this);
        if (props.name) {
            this.name = props.name;
            this.registerTimer = setInterval(() => {
                if (this.context) {
                    this.name = this.context.registerInput(this);
                    this.registerTimer && clearInterval(this.registerTimer);
                }
            }, 100);
        }
        else
            __DEV__ && console.log('Unnamed ComponentX : ' + this.constructor.name);


    }
    
    validate() {
        let hasError = null;
        let validators = this.validators instanceof Array ? this.validators : [this.validators];
        validators.some(validator => {
            hasError = validator.regex.test(this.state.value) ? null : validator.msg;
            if (hasError)
                return true;
        });
        this.setState({ hasError })
        return !hasError;
    }
    echo() {
        console.log('ccwwss');
    }
}
export type { tValidators, ComponentXProps }
export default ComponentX