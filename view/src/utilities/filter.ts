import { RepoStatus, Filters } from "./types";

const applyFilters = (repos: RepoStatus[], filters: Filters): RepoStatus[] => {
    const filteredRepos: RepoStatus[] = repos.filter(repo => {
        if (filters.showBehindRepos === true && repo.behind > 0) {
            return true;
        }

        if (filters.showAheadRepos === true && repo.ahead > 0) {
            return true;
        }

        if (filters.showReposWithUncommittedChanges === true && repo.differentFiles > 0) {
            return true;
        }
        
        if (filters.showCleanRepos === true && repo.differentFiles === 0 && repo.behind === 0 && repo.ahead === 0) {
            return true;
        }

        return false;
    });

    return filteredRepos;
}

export default applyFilters;