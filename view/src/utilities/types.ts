interface APIStatus {
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

interface RepoStatus {
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
}