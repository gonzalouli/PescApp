import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gonzalouli.pescapp",
  appName: "PescApp",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.50.192:8100",
    hostname: "127.0.0.1",
    cleartext: true,
  },
  cordova: {},
};

export default config;
