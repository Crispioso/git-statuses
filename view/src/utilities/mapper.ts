import { APIStatus, RepoStatus } from "./types";

class Mapper {
    static responseToState = (response: APIStatus[]): RepoStatus[] => (
        response.map((status: APIStatus): RepoStatus => ({
            name: status.name,
            ahead: status.ahead,
            behind: status.behind,
            current: status.current,
            created: status.created,
            deleted: status.deleted,
            modified: status.modified,
            differentFiles: status.files.length,
            renamed: status.renamed,
            staged: status.staged
        }))
    )
}

export default Mapper;