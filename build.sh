#!/bin/sh
cd ./$PROJECT_NAME
npm install
ionic cordova prepare
ionic cordova build ios --release
cd ../
bundle exec fastlane ios prepare
