# Clinic Testing App

Before starting, please ensure you have install the library first, for more details, please visit https://reactnative.dev/docs/environment-setup
 - Homebrew - https://brew.sh/
 - nodeJs - https://nodejs.org/en/
 - watchman - https://facebook.github.io/watchman/docs/install.html
 - cocoapods (For IOS) - https://cocoapods.org/
 - Xcode (For IOS)
 - Android Studio (For Android)
 - yarn (https://yarnpkg.com/)

After install the library, find out the ip address of your computer and replace to the baseURL of 
```javascript
// /mobile/src/utils/request.ts
const instance = Axios.create({
    baseURL: '{your ip address}'
});
```

After Update the baseURL, update SqlConnector to your sql database
In my case, I am using sql database provided by microsoft azure
```javascript
// /server/src/datasources/clinic-db.datasource.ts
...
const config = {
  name: 'ClinicDb',
  connector: 'mssql',
  url: '',
  host: '{your host name}',
  port: 1433,
  user: '{username}',
  password: '{password}',
  database: '{database_name}'
};
...
```

After setup SQL database, initialize the database by execute the /init.sql
 
#Installation
Install the dependencies and devDependencies and start the backend server.
```bash
$ cd server
$ npm install
$ npm start
```

Install the depencies and start the metro server
```bash
$ cd mobile
$ yarn install
$ yarn run start
```

Build app and execute in simulatoor
```bash
$ cd mobile
$ yarn run [ios/android]
```
