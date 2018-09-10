import { APIStatus } from "./types";

export default class api {
    static getStatuses(): Promise<APIStatus[]> {
        return fetch('/statuses').then(response => response.json());
    }
}