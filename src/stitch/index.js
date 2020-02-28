import { app } from './app';
import { users, records } from './mongodb';
import {
  getWeeklyReport,
  getWeeklyTotal,
  getUserReport,
  getDailyReport,
  getDailyTotal,
  getUser,
  getLastRecord
} from './mongodb';
import {
    loginAnonymous,
    logoutCurrentUser,
    hasLoggedInUser,
    getCurrentUser
} from './authentication';

export { app, users, records };
export { getWeeklyReport, getWeeklyTotal, getUserReport, getDailyReport, getDailyTotal, getUser, getLastRecord };
export { loginAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentUser };