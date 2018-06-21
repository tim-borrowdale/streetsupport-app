#!/bin/sh

cd ./$PROJECT_NAME
npm install --production
ionic cordova prepare
ionic cordova build android --prod --release
cd ..
bundle exec fastlane android beta

