import { AppState, RepoStatus } from "../utilities/types";

export const initialState: AppState = {
    repos: []
}

/**
 * State action types
 */
export enum ActionTypeKeys {
    ADD_REPOS = "ADD_REPOS",
    REDUX_INIT = "@@INIT",
    OTHER_ACTION = "OTHER_ACTION"
}

interface AddRepos {
    type: ActionTypeKeys.ADD_REPOS;
    repos: RepoStatus[]
}

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

interface ReduxInit {
    type: ActionTypeKeys.REDUX_INIT;
}

export type ActionTypes = (
    AddRepos |
    OtherAction |
    ReduxInit
)
