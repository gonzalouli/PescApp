import firebase from "firebase";

import * as credentials from "./firebaseCredentials";

export const initializeFirebase = (): any => {
  firebase.initializeApp({
    apiKey: credentials.firebaseConfig.apiKey,
    authDomain: credentials.firebaseConfig.authDomain,
    projectId: credentials.firebaseConfig.projectId,
    storageBucket: credentials.firebaseConfig.storageBucket,
    messagingSenderId: credentials.firebaseConfig.messagingSenderId,
    appId: credentials.firebaseConfig.appId,
  });
  return firebase;
};

export const askPermissionNotification = async (firebase: any) => {
  const messaging = firebase.messaging();
  await messaging.requestPermission();
  return await messaging.getToken();
};
