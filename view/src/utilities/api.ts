import { APIStatus } from "./types";

export default class api {

    static getStatuses(): Promise<APIStatus[]> {
        return fetch('/statuses').then(response => response.json());
    }

    static refreshRepo(repoID: string): Promise<APIStatus> {
        return fetch(`/statuses/${repoID}/fetch`, {
            method: "POST",
            body: "{}"
        }).then(response => response.json());
    }
}