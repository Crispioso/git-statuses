import { AppState, RepoStatus } from "../utilities/types";

export const initialState: AppState = {
    repos: [],
    isEditingFilters: false,
    isFetchingAllRepos: false,
    filters: {
        showBehindRepos: true,
        showAheadRepos: true,
        showReposWithUncommittedChanges: true,
        showCleanRepos: true
    }
}

/**
 * State action types
 */
export enum ActionTypeKeys {
    ADD_REPOS = "ADD_REPOS",
    UPDATE_REPO = "UPDATE_REPO",
    TOGGLE_REPO_IS_UPDATING = "TOGGLE_REPO_IS_UPDATING",
    IS_FETCHING_ALL_REPOS = "IS_FETCHING_ALL_REPOS",
    TOGGLE_SHOW_BEHIND_FILTER = "TOGGLE_SHOW_BEHIND_FILTER",
    TOGGLE_SHOW_AHEAD_FILTER = "TOGGLE_SHOW_AHEAD_FILTER",
    TOGGLE_SHOW_CLEAN_FILTER = "TOGGLE_SHOW_CLEAN_FILTER",
    TOGGLE_SHOW_UNCOMMITTED_CHANGES_FILTER = "TOGGLE_SHOW_UNCOMMITTED_CHANGES_FILTER",
    TOGGLE_IS_EDITING_FILTERS = "TOGGLE_IS_EDITING_FILTERS",
    REDUX_INIT = "@@INIT",
    OTHER_ACTION = "OTHER_ACTION"
}

interface AddRepos {
    type: ActionTypeKeys.ADD_REPOS;
    repos: RepoStatus[]
}

interface UpdateRepo {
    type: ActionTypeKeys.UPDATE_REPO;
    repo: RepoStatus
}

interface ToggleRepoIsUpdating {
    type: ActionTypeKeys.TOGGLE_REPO_IS_UPDATING;
    repoName: string
}

interface ToggleIsFetchingAllRepos {
    type: ActionTypeKeys.IS_FETCHING_ALL_REPOS
}

interface ToggleIsEditingFilters {
    type: ActionTypeKeys.TOGGLE_IS_EDITING_FILTERS;
}

interface ToggleShowBehindFilter {
    type: ActionTypeKeys.TOGGLE_SHOW_BEHIND_FILTER;
}

interface ToggleShowAheadFilter {
    type: ActionTypeKeys.TOGGLE_SHOW_AHEAD_FILTER;
}

interface ToggleShowCleanFilter {
    type: ActionTypeKeys.TOGGLE_SHOW_CLEAN_FILTER;
}

interface ToggleShowUncommittedChangesFilter {
    type: ActionTypeKeys.TOGGLE_SHOW_UNCOMMITTED_CHANGES_FILTER;
}

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

interface ReduxInit {
    type: ActionTypeKeys.REDUX_INIT;
}

export type ActionTypes = (
    AddRepos |
    UpdateRepo |
    ToggleRepoIsUpdating |
    ToggleIsFetchingAllRepos |
    ToggleShowBehindFilter |
    ToggleShowAheadFilter |
    ToggleShowCleanFilter |
    ToggleShowUncommittedChangesFilter |
    ToggleIsEditingFilters |
    OtherAction |
    ReduxInit
)
