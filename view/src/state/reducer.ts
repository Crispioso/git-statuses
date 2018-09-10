import { ActionTypes, ActionTypeKeys, initialState } from "./stateTypes";
import { AppState } from "../utilities/types";

export default function reducer(state: AppState = initialState, action: ActionTypes) {
    switch (action.type) {
        case(ActionTypeKeys.TOGGLE_IS_EDITING_FILTERS): {
            return {
                ...state,
                isEditingFilters: !state.isEditingFilters
            }
        }
        case(ActionTypeKeys.ADD_REPOS): {
            return {
                ...state,
                repos: [...action.repos]
            }
        }
        case(ActionTypeKeys.IS_FETCHING_ALL_REPOS): {
            return {
                ...state,
                isFetchingAllRepos: !state.isFetchingAllRepos
            }
        }
        case(ActionTypeKeys.TOGGLE_SHOW_BEHIND_FILTER): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    showBehindRepos: !state.filters.showBehindRepos
                }
            }
        }
        case(ActionTypeKeys.TOGGLE_SHOW_AHEAD_FILTER): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    showAheadRepos: !state.filters.showAheadRepos
                }
            }
        }
        case(ActionTypeKeys.TOGGLE_SHOW_CLEAN_FILTER): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    showCleanRepos: !state.filters.showCleanRepos
                }
            }
        }
        case(ActionTypeKeys.TOGGLE_SHOW_UNCOMMITTED_CHANGES_FILTER): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    showReposWithUncommittedChanges: !state.filters.showReposWithUncommittedChanges
                }
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