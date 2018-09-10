import { ActionTypes, ActionTypeKeys, initialState } from "./stateTypes";
import { AppState } from "../utilities/types";

export default function reducer(state: AppState = initialState, action: ActionTypes) {
    switch (action.type) {
        case(ActionTypeKeys.ADD_REPOS): {
            return {
                ...state,
                repos: [...action.repos]
            }
        }
        case(ActionTypeKeys.REDUX_INIT): {
            return {...state}
        }
        default: {
            console.log("Unrecognised action type given to Redux reducer", action.type);
            return {...state};
        }
    }
}