// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://cart-scg.herokuapp.com',
  firebaseConfig : {
    apiKey: "AIzaSyBgKN-J9FQk78c39Pohv5iLKokqdbUJTFI",
    authDomain: "cart-scg.firebaseapp.com",
    databaseURL: "https://cart-scg.firebaseio.com",
    projectId: "cart-scg",
    storageBucket: "cart-scg.appspot.com",
    messagingSenderId: "13580976610",
    appId: "1:13580976610:web:8b1ad5c093f3645a0bb9bb"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
