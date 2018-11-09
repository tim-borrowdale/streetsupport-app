#!/bin/sh
cd ./$PROJECT_NAME
npm install
ionic cordova prepare ios
ionic cordova build ios --prod
cd ..
bundle exec fastlane ios beta