import { useReducer, useEffect } from 'react';
import moment from 'moment';

import {
  records,
  getWeeklyReport,
  getUserReport,
  getDailyReport,
  getDailyTotal,
  getUser,
  users
} from '../stitch';

const recordReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setRecords': {
      return {
        ...state,
        records: payload.timeRecords || []
      };
    }
    case 'setFirstRecord': {
      return {
        ...state,
        firstRecord: payload.firstRecord || []
      };
    }
    case 'setDailyTotal': {
      return {
        ...state,
        dailyTotal: payload.dailyTotal || 0
      };
    }
    case 'setUser': {
      return {
        ...state,
        user: payload.user || {}
      };
    }
    case 'editRecord': {
      const updateRecord = record => {
        const isThisRecord = record._id.equals(payload._id);
        return isThisRecord ? payload : record;
      };

      return {
        ...state,
        records: state.records.map(updateRecord).sort((a, b) => b.timeIn - a.timeIn)
      };
    }
    case 'deleteRecord': {
      return {
        ...state,
        records: state.records.filter(record => !record._id.equals(payload))
      }
    }
    case 'addRecord': {
      return {
        ...state,
        records: [payload, ...state.records].sort((a, b) => b.timeIn - a.timeIn)
      }
    }
    default: {
      console.log(`Received invalid action type: ${type}`);
    }
  }
}

export function useTimeClockRecords(reportType, startDate, endDate, userId = null) {
  const [state, dispatch] = useReducer(recordReducer, { records: [], firstRecord: [], dailyTotal: '', user: {} });

  /* async function getRecords() {
    const timeRecords = await records.find({}, { limit: 500 }).asArray();
    addFriendlyDates(timeRecords);
    dispatch({ type: 'setRecords', payload: { timeRecords } });
  }; */

  async function editRecord(record) {
    const query = { _id: record._id };
    const update = { $set: { timeIn: record.timeIn, timeOut: record.timeOut } };
    const options = { returnNewDocument: true };
    const updatedRecord = await records.findOneAndUpdate(query, update, options);

    if (updatedRecord) {
      dispatch({ type: 'editRecord', payload: updatedRecord });
      getDailyTotal(startDate, endDate, userId).then(dailyTotal => {
        dispatch({ type: 'setDailyTotal', payload: { dailyTotal } });
      });
      return true;
    } else {
      console.error('Failed to update record');
      return true;
    }
  };

  async function deleteRecord(id) {
    await records.deleteOne({ _id: id });
    dispatch({ type: 'deleteRecord', payload: id });
    getDailyTotal(startDate, endDate, userId).then(dailyTotal => {
      dispatch({ type: 'setDailyTotal', payload: { dailyTotal } });
    });
    
    /* if (deletedCount > 0) {
      dispatch({ type: 'deleteRecord', payload: id });
    } else {
      console.error(`Failed to delete record with id ${id}`);
    } */
  }

  async function addRecordFromDaily(record) {
    record = { owner_id: userId, owner_name: state.user.name, ...record };
    const newRecordId = await records.insertOne(record);

    if (newRecordId) {
      dispatch({ type: 'addRecord', payload: { _id: newRecordId, ...record } });
      getDailyTotal(startDate, endDate, userId).then(dailyTotal => {
        dispatch({ type: 'setDailyTotal', payload: { dailyTotal } });
      });
      return newRecordId;
    } else {
      console.error('Failed to add record');
    }
  }

  async function addRecordFromUser(record) {
    record = { owner_id: userId, owner_name: state.user.name, ...record };
    const newRecordId = await records.insertOne(record);

    if (newRecordId) {
      getUserReport(startDate, endDate, userId).then(timeRecords => {
        dispatch({ type: 'setRecords', payload: { timeRecords } });
      });
      return newRecordId;
    } else {
      console.error('Failed to add record');
    }
  }

  async function addHolidayRecords(date) {
    const usersList = await users.find().toArray();
    let newRecords = [];

    for (const user of usersList) {
      const newRecord = {
        owner_id: user.user_id,
        owner_name: user.name,
        timeIn: new Date(date.setHours(8, 0, 0, 0)),
        timeOut: new Date(date.setHours(16, 0, 0, 0)),
        isHoliday: true
      };

      newRecords.push(newRecord);
    }

    // console.dir(newRecords);
    await records.insertMany(newRecords);
  }

  async function addLunchTime(recordsArray) {
    const origRecord = recordsArray[0];
    const origTimeOut = origRecord.timeOut;
    await editRecord({ ...origRecord, timeOut: moment(origTimeOut).startOf('day').hour(11).minute(30).toDate() });
    await addRecordFromDaily({ timeIn: moment(origTimeOut).startOf('day').hours(12).toDate(), timeOut: origTimeOut });
  }

  async function editUser(userId, newBankedHours) {
    await users.updateOne({ user_id: userId }, { $set: { bankedHours: newBankedHours } });
    dispatch({ type: 'setUser', payload: { user: { ...state.user, bankedHours: newBankedHours } } });
    /* getUser(userId).then(user => {
      dispatch({ type: 'setUser', payload: { user } });
    }); */
  }

  useEffect(() => {
    switch (reportType) {
      case 'weekly': {
        /* getWeeklyReport(startDate, endDate).then(timeRecords => {
          dispatch({ type: 'setRecords', payload: { timeRecords } });
        }); */
        getWeeklyReport().then(timeRecords => {
          dispatch({ type: 'setRecords', payload: { timeRecords } });
        });
        break;
      }
      case 'user': {
        getUserReport(startDate, endDate, userId).then(timeRecords => {
          // dispatch({ type: 'setRecords', payload: { timeRecords: timeRecords.slice(1) } });
          dispatch({ type: 'setRecords', payload: { timeRecords: timeRecords } });
          dispatch({ type: 'setFirstRecord', payload: { firstRecord: [timeRecords[0]] } });
        });
        getUser(userId).then(user => {
          dispatch({ type: 'setUser', payload: { user } });
        });
        break;
      }
      case 'daily': {
        getDailyReport(startDate, endDate, userId).then(timeRecords => {
          dispatch({ type: 'setRecords', payload: { timeRecords } });
        });
        getDailyTotal(startDate, endDate, userId).then(dailyTotal => {
          dispatch({ type: 'setDailyTotal', payload: { dailyTotal } });
        });
        getUser(userId).then(user => {
          dispatch({ type: 'setUser', payload: { user } });
        });
        break;
      }
      default: {
        console.error(`Unknown reportType: ${reportType}`);
      }
    }
  }, [reportType, startDate, endDate, userId]);

  return {
    records: state.records,
    firstRecord: state.firstRecord,
    dailyTotal: state.dailyTotal,
    user: state.user,
    actions: {
      editRecord,
      deleteRecord,
      addRecordFromDaily,
      addRecordFromUser,
      editUser,
      addHolidayRecords,
      addLunchTime
    }
  };
}

/* const addFriendlyDates = records => {
  records.forEach(record => {
    const timeIn = record.timeIn;
    const timeOut = record.timeOut;
    record.timeInFriendly = {
      dayOfWeek: timeIn.getDay(),
      month: timeIn.getMonth(),
      dayOfMonth: timeIn.getDate(),
      year: timeIn.getFullYear(),
      hours: timeIn.getHours(),
      minutes: timeIn.getMinutes(),
      get isAM() {
        return this.hours < 12;
      },
      get hoursFormatted() {
        if (this.hours > 12) {
          return this.hours - 12;
        } else if (this.hours === 0) {
          return 12;
        } else {
          return this.hours;
        }
      },
      get minutesFormatted() {
        if (this.minutes < 10) {
          return `0${this.minutes}`;
        } else {
          return `${this.minutes}`;
        }
      },
      get timeString() {
        if (this.isAM) {
          if (this.hoursFormatted < 10) {
            return `0${this.hoursFormatted}:${this.minutesFormatted} AM`;
          } else {
            return `${this.hoursFormatted}:${this.minutesFormatted} AM`;
          }
        } else {
          if (this.hoursFormatted < 10) {
            return `0${this.hoursFormatted}:${this.minutesFormatted} PM`;
          } else {
            return `${this.hoursFormatted}:${this.minutesFormatted} PM`;
          }
        }
      }
    };
    record.timeOutFriendly = {
      dayOfWeek: timeOut.getDay(),
      month: timeOut.getMonth(),
      dayOfMonth: timeOut.getDate(),
      year: timeOut.getFullYear(),
      hours: timeOut.getHours(),
      minutes: timeOut.getMinutes(),
      get isAM() {
        return this.hours < 12;
      },
      get hoursFormatted() {
        if (this.hours > 12) {
          return this.hours - 12;
        } else if (this.hours === 0) {
          return 12;
        } else {
          return this.hours;
        }
      },
      get minutesFormatted() {
        if (this.minutes < 10) {
          return `0${this.minutes}`;
        } else {
          return `${this.minutes}`;
        }
      },
      get timeString() {
        if (this.isAM) {
          if (this.hoursFormatted < 10) {
            return `0${this.hoursFormatted}:${this.minutesFormatted} AM`;
          } else {
            return `${this.hoursFormatted}:${this.minutesFormatted} AM`;
          }
        } else {
          if (this.hoursFormatted < 10) {
            return `0${this.hoursFormatted}:${this.minutesFormatted} PM`;
          } else {
            return `${this.hoursFormatted}:${this.minutesFormatted} PM`;
          }
        }
      }
    };
  });
} */
