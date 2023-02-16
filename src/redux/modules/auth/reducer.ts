import { SET_AUTH_BUTTONS, SET_AUTH_ROUTER } from "../../types";
import { AuthState } from "../../interface";
import { AnyAction } from "redux";
import produce from "immer";

const authState: AuthState = {
	authButtons: {},
	authRouter: []
};

export default function authReducer(state : AuthState = authState, action : AnyAction) {
    return produce(state, draftState => {
        switch (action.type) {
			case SET_AUTH_BUTTONS:
				draftState.authButtons = action.authButtons;
				break;
			case SET_AUTH_ROUTER:
				draftState.authRouter = action.authRouter;
				break;
			default:
				return draftState;
		}
    });
}