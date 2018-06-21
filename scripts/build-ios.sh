#!/bin/sh
cd ./$PROJECT_NAME
npm install
ionic cordova prepare
ionic cordova build ios --prod
cd ..
bundle exec fastlane ios beta