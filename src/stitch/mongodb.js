import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { app } from './app';

const mongoClient = app.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

export const records = mongoClient.db('time-clock').collection('records');
export const users = mongoClient.db('time-clock').collection('users');

export async function getWeeklyReport() {
  const report = await users.find().toArray();

  for (const user of report) {
    const lastRecord = await getLastRecord(user.user_id);
    if (!lastRecord.timeOut) {
      user.hasClockedIn = true;
    } else {
      user.hasClockedIn = false;
    }
  }
  
  return report;
}

export async function getWeeklyTotal(startDate, endDate, userId) {
  const pipeline = [
    {
      $match: {
        timeIn: {
          $gte: startDate,
          $lte: endDate
        },
        owner_id: userId
      }
    },
    {
      $group: {
        _id: null,
        totalMilliseconds: { $sum: { $subtract: ['$timeOut', '$timeIn'] } }
      }
    },
    {
      $addFields: {
        totalHours: {
          $divide: ['$totalMilliseconds', 3600000]
        }
      }
    }
  ];

  const report = await records.aggregate(pipeline).first();
  return report ? report.totalHours : 0;
}

/* export async function getWeeklyReport(startDate, endDate) {
  const pipeline = [
    {
      $match: {
        timeIn: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: '$owner_id',
        owner_id: { $first: '$owner_id' },
        name: { $first: '$owner_name' },
        totalHours: { $sum: { $subtract: ['$timeOut', '$timeIn'] } }
      }
    }
  ];

  const report = await records.aggregate(pipeline).toArray();

  report.forEach(record => {
    record.totalHours = (record.totalHours / 3600000).toFixed(2);
  });

  return report;
} */

export async function getUserReport(startDate, endDate, userId) {
  const pipeline = [
    {
      $match: {
        timeIn: {
          $gte: startDate,
          $lte: endDate
        },
        owner_id: userId
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%m/%d/%Y', date: '$timeIn' } },
        hoursForDay: { $sum: { $subtract: ['$timeOut', '$timeIn'] } },
        records: { $push: '$$ROOT' },
        owner_id: { $first: '$owner_id' },
        name: { $first: '$owner_name' },
        rawDate: { $first: '$timeIn' }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ];

  const report = await records.aggregate(pipeline).toArray();

  report.forEach(record => {
    record.hoursForDay = record.hoursForDay / 3600000;
  });

  return report;
}

export async function getDailyReport(startDate, endDate, userId) {
  const pipeline = [
    {
      $match: {
        timeIn: {
          $gte: startDate,
          $lt: endDate
        },
        owner_id: userId
      },
    },
    {
      $sort: {
        timeIn: -1
      }
    }
  ];

  const report = await records.aggregate(pipeline).toArray();

  return report;
}

export async function getDailyTotal(startDate, endDate, userId) {
  const pipeline = [
    {
      $match: {
        timeIn: {
          $gte: startDate,
          $lt: endDate
        },
        owner_id: userId
      }
    },
    {
      $group: {
        _id: null,
        dailyTotal: { $sum: { $subtract: ['$timeOut', '$timeIn'] } }
      }
    }
  ];

  const aggregate = await records.aggregate(pipeline).first();
  // const dailyTotal = aggregate ? aggregate.dailyTotal / 3600000 : 0;
  const dailyTotal = aggregate.dailyTotal / 3600000;

  return dailyTotal;
}

export async function getUser(userId) {
  const user = await users.findOne({ user_id: userId });
  return user;
}

export async function getLastRecord(userId) {
  const query = { owner_id: userId };
  const options = { sort: { _id: -1 } };

  return await records.findOne(query, options);
}
