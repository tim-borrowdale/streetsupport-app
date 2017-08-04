# Street Support App

Hybrid app for iOS and Android using Ionic Framework v2

### git-flow

This repository uses the git-flow workflow. As such:

* Master branch is the latest version of the app available to the public,
* Develop branch is the next work in progress version,
* Feature branches contain new functionality which are WIP, before they are ready to be merged into develop,
* Release branches are for when getting ready to deploy a new version to Master. Used for last minute changes before a new build launches.
* Hotfix branches are for emergency fixes to Master.

*NEVER* work directly on the master branch. See https://danielkummer.github.io/git-flow-cheatsheet/ for a quick guide to git-flow.

### Tech

* [Ionic] - mobile hybrid app framework built on top of Cordova and AngularJS v2

### Installation

You need Ionic CLI installed globally (may have to use sudo):

```sh
$ npm install -g ionic@beta
$ npm install -g cordova
```
During development run the following to run the app in a browser from a local server

```sh
$ git clone git@github.com:StreetSupport/streetsupport-app.git
$ cd streetsupport-app
$ npm install
$ ionic serve
```
to build for a particular platform (ios, android) run

```sh
$ ionic platform add [platform]
$ ionic emulate [platform]
```

To run on  a device run

```sh
$ ionic run [platform]
```
