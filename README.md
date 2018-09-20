git-statuses
==================

> A user interface to view the status of multiple Git repos

## Getting started

First, make sure that you've got [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed.

The app requires

Then run the following command in the root of this repo:
```
make start
```

## To do
- Add 'Developing' heading to README.md and update Makefile to make it more obvious how to develop the app yourself.
- Add an icon and favicon to the UI.
- Allow the path to the `config.json` file to be configurable when the app is run.
- Add 'Fetch all' option to UI.
- Persist data after the client and server have been closed (possibly using a `.git-status` directory like Git does).
- Add 'Tags' to repos that can be filtered on.
- Add basic keyword search filter.