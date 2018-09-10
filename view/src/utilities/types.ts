export interface APIStatus {
    not_added: string[];
    conflicted: string[];
    created: string[];
    deleted: string[];
    modified: string[];
    renamed: string[];
    staged: string[];
    files: {
        path: string;
        index: string;
        working_dir: string;
    }[];
    ahead: number;
    behind: number;
    current: string;
    tracking: string;
    local_path: string;
    name: string;
}

export interface RepoStatus {
    name: string;
    ahead: number;
    behind: number;
    current: string;
    created: string[];
    deleted: string[];
    modified: string[];
    renamed: string[];
    staged: string[];
    differentFiles: number;
    isUpdating?: boolean
}

export interface AppState {
    repos: RepoStatus[],
    isEditingFilters: boolean,
    isFetchingAllRepos: boolean,
    filters: Filters
}

export interface Filters {
    showBehindRepos?: boolean
    showAheadRepos?: boolean
    showReposWithUncommittedChanges?: boolean
    showCleanRepos?: boolean
}