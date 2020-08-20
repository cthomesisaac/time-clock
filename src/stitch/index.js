import { app } from './app';
import { users, records, notifications } from './mongodb';
import {
  getWeeklyReport,
  getWeeklyTotal,
  getUserReport,
  getDailyReport,
  getDailyTotal,
  getUser,
  getLastRecord,
  getNotifications,
  getUsers
} from './mongodb';
import {
  loginAnonymous,
  logoutCurrentUser,
  hasLoggedInUser,
  getCurrentUser
} from './authentication';

export { app, users, records, notifications };
export {
  getWeeklyReport,
  getWeeklyTotal,
  getUserReport,
  getDailyReport,
  getDailyTotal,
  getUser,
  getLastRecord,
  getNotifications,
  getUsers
};
export { loginAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentUser };