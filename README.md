# Street Support App

Hybrid app for iOS and Android using Ionic Framework v3

### Preinstall sanity check - Node, npm, nvm

Open a console and type
```node -v && npm -v``` to get your node and npm versions

If your node version is 6.*, type ```nvm install 10```, 

or download a version of nodejs (Long Term Support is recommended) from https://nodejs.org/en/download/

### Tech

* [Ionic] - mobile hybrid app framework built on top of Cordova and AngularJS v5

### Installation

You need Ionic CLI installed globally (may have to use sudo):

```sh
$ npm install -g ionic cordova
```
During development run the following to run the app in a browser from a local server

```sh
$ git clone git@github.com:StreetSupport/streetsupport-app.git
$ cd streetsupport-app/StreetSupportApp
$ npm install
$ ionic serve
```
to build for a particular platform (ios, android) run

```sh
$ ionic cordova platform add [platform]
$ ionic cordova emulate [platform]
```

To run on  a device run

```sh
$ ionic run [platform]
```
