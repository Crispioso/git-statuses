import { ActionTypeKeys } from "./stateTypes";
import { RepoStatus } from "../utilities/types";

export const addRepos = (repos: RepoStatus[]) => ({
    type: ActionTypeKeys.ADD_REPOS,
    repos
})