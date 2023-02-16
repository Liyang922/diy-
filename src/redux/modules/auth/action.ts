import { SET_AUTH_BUTTONS, SET_AUTH_ROUTER } from "../../types";

export function setAuthButtons(authButtons : { [propName : string] : any }) {
    return {
        type: SET_AUTH_BUTTONS,
        authButtons
    };
}

export function setAuthRouter(authRouter : string[]) {
    return {
        type: SET_AUTH_ROUTER,
        authRouter
    }
}