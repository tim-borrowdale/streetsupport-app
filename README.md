# Street Support App

Hybrid app for iOS and Android using Ionic Framework v2

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
