import { app } from './app';
import { users, records } from './mongodb';
import {
  getWeeklyReport,
  getWeeklyTotal,
  getUserReport,
  getDailyReport,
  getDailyTotal,
  getUser
} from './mongodb';
import {
    loginAnonymous,
    logoutCurrentUser,
    hasLoggedInUser,
    getCurrentUser
} from './authentication';

export { app, users, records };
export { getWeeklyReport, getWeeklyTotal, getUserReport, getDailyReport, getDailyTotal, getUser };
export { loginAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentUser };