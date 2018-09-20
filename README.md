git-statuses
==================

> A user interface to view the status of multiple Git repos

## Getting started

First, make sure that you've got [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed.

You have to create a valid [config file](#creating-a-config-file) to have been created before starting the app.

Finally, start the app with:
```
make start
```

### Creating a config file

The config file is a `config.json` file that lives in the root of this project.

There are two ways to set what git repos are checked by the app:

#### Setting a root directory

Include an absolute path to the directory that has all of the Git repos you want the app to discover

```json
{
    rootDirectory: "/Users/myname/code/src/github.com/crispioso"
}
```

#### Setting individual repo paths

Include an array of absolute paths to the Git repos you want the app to discover

```json
{
    paths: [
        "/Users/myname/code/src/github.com/crispioso/project1"
        "/Users/myname/code/src/github.com/crispioso/project2"
        "/Users/myname/code/src/github.com/crispioso/project3"
    ]
}
```

**Note**: If both `rootDirectory` and `paths` are included, then `paths` will be used by the app

## To do
- Add unit tests!
- Add 'Developing' heading to README.md and update Makefile to make it more obvious how to develop the app yourself.
- Add an icon and favicon to the UI.
- Allow the path to the `config.json` file to be configurable when the app is run.
- Add 'Fetch all' option to UI.
- Persist data after the client and server have been closed (possibly using a `.git-status` directory like Git does).
- Add 'Tags' to repos that can be filtered on.
- Add basic keyword search filter.