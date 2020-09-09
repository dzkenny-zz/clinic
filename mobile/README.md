#install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

#install node, sass and watchman
brew install node
brew install watchman

#install cocoapods
sudo gem install cocoapods

#download modules
yarn install

#start metro bundler
yarn run start

#start development
yarn run ios

#main framework api
1 - mobx
https://mobx-react.js.org/
2 - react-native
https://reactnative.dev/docs/activityindicator
3 - native-base
https://docs.nativebase.io/

#pages
usage:
 - all specific screens should be put here

 #services
 usage:
 - all library or minor function should be code here

 #stores
 usage:
 - all data should be save here

 #utils
 usage:
  - common function, i.e. date converter
