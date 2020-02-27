import { Stitch } from 'mongodb-stitch-browser-sdk';

const APP_ID = 'time-clock-imuhr';

export const app = Stitch.hasAppClient(APP_ID) ? Stitch.getAppClient(APP_ID) : Stitch.initializeAppClient(APP_ID);