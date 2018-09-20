import git from 'simple-git/promise';
import express from 'express';
import { Request, Response } from "express";
import fs from 'fs' ;
import path from 'path';
import {statSync, readdirSync} from 'fs' ;
import { join } from 'path';
import getRepoName from 'git-repo-name';

const app = express();
let latestStatuses: Status[] = []

type Config = {
    rootDirectory: string,
    paths: string[]
}

interface Status extends git.StatusResult {
    local_path: string,
    name: string
}

let configPath: string = process.env.CONFIG || "../config.json";
const config: Config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const rootDir: string = config.rootDirectory || __dirname;
let paths: Array<string> = config.paths;

if (!paths || paths.length === 0) {
    const dirs = (p: string) => readdirSync(p).filter((f: string) => statSync(join(p, f)).isDirectory())
    paths = dirs(rootDir);
}

const getStatuses: () => Promise<Status[]> = async () => {
    let statuses: Status[] = []
    for (const path of paths) {
        console.log(`Start getting '${path}'`);
        const fullPath: string = `${rootDir}/${path}`;
        try {
            const dir: git.SimpleGit = await git(fullPath);
            const isRepo = await dir.checkIsRepo();
            if (!isRepo) {
                console.log(`'${path}' isn't a repo, skipping directory...`);
                continue;
            }
            // await dir.fetch().catch(error => console.error("Error fetching for repo", error));
            const status: git.StatusResult = await dir.status();
            const name: string = getRepoName.sync(fullPath);
            const item: Status = {
                local_path: fullPath,
                name,
                ...status
            }
            console.log(`Finished getting '${path}'`, item.local_path);
            statuses.push(item);
        } catch (error) {
            console.error(`Error trying to get git status for Git directory:\n'${fullPath}'`, error);
            continue;
        }
    };
    try {
        statuses = statuses.sort((a: Status, b: Status) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    } catch (error) {
        console.error("Error trying to sort statuses into aphabetical order of the names", error);
    }
    return statuses;
};

const handleStatus = async (req: Request, res: Response) => {
    const statuses: Status[] = await getStatuses();
    latestStatuses = statuses;
    res.json(statuses);
};

const handleFetch = async (req: Request, res: Response) => {
    const repoName: string = req.params.repo;
    const currentStatus: Status = latestStatuses.find((status: Status) => status.name === repoName);
    const dir: git.SimpleGit = await git(currentStatus.local_path);
    const isRepo: boolean = await dir.checkIsRepo();

    if (!isRepo) {
        res.status(404).send("{message: 'Repo not found'}");
        return;
    }

    await dir.fetch().catch(error => {
        console.error("Error fetching from remote", error);
        res.status(500).send("{message: 'Error fetching from remote'}");
        return;
    });

    const response: git.StatusResult = await dir.status();
    const status: Status = {
        local_path: currentStatus.local_path,
        name: repoName,
        ...response
    };

    res.json(status);
}

app.use(function (req, res, next) {
    console.log("Incoming request...", req.path);
    next();
});
app.set("port", process.env.PORT || 3000);
app.get("/statuses", handleStatus);
app.post("/statuses/:repo/fetch", handleFetch);
app.use("/assets", express.static(path.resolve('../assets')));
app.get("*", (_, res) => {
    res.sendFile(path.resolve('../index.html'));
});
app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
});