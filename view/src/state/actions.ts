import { ActionTypeKeys } from "./stateTypes";
import { RepoStatus } from "../utilities/types";

export const addRepos = (repos: RepoStatus[]) => ({
    type: ActionTypeKeys.ADD_REPOS,
    repos
});

export const updateRepo = (repo: RepoStatus) => ({
    type: ActionTypeKeys.UPDATE_REPO,
    repo
});

export const toggleRepoIsUpdating = (repoName: string) => ({
    type: ActionTypeKeys.TOGGLE_REPO_IS_UPDATING,
    repoName
});

export const toggleIsFetchingAllRepos = () => ({
    type: ActionTypeKeys.IS_FETCHING_ALL_REPOS,
});

export const toggleFiltersEditing = () => ({
    type: ActionTypeKeys.TOGGLE_IS_EDITING_FILTERS,
});

export const toggleShowBehindFilter = () => ({
    type: ActionTypeKeys.TOGGLE_SHOW_BEHIND_FILTER,
});

export const toggleShowAheadFilter = () => ({
    type: ActionTypeKeys.TOGGLE_SHOW_AHEAD_FILTER,
});

export const toggleShowCleanFilter = () => ({
    type: ActionTypeKeys.TOGGLE_SHOW_CLEAN_FILTER,
});

export const toggleShowUncommittedChangesFilter = () => ({
    type: ActionTypeKeys.TOGGLE_SHOW_UNCOMMITTED_CHANGES_FILTER,
});