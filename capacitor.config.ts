import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gonzalouli.pescapp',
  appName: 'PescApp',
  webDir: 'build',
  bundledWebRuntime: false,
  server : {
    url : "http://192.168.50.192:8100"
  },
  cordova:{}
};

export default config;
