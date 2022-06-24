import React from "react";
import { FormXInterface } from "../FormX";
class ContextX {
    static context: React.Context<FormXInterface | null>;
    static getContext() {
        if (!this.context)
            this.context = React.createContext<FormXInterface | null>(null);
        return this.context;
    }
}
export default ContextX.getContext();