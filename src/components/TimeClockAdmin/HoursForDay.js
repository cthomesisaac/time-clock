import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';

import { getWeeklyTotal } from '../../stitch';

export default function HoursForDay({ date, userId }) {
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const getTotalHours = async () => {
      const startDate = new Date(date);
      const endDate = moment(date).add(1, 'd').toDate();
      const total = await getWeeklyTotal(startDate, endDate, userId);
      setHours(total.toFixed(2));
    };

    getTotalHours();
  }, [date, userId]);

  // useEffect(() => {
  //   async function getHours(date, userId) {
      // const startDate = new Date(date);
      // const endDate = moment(date).add(1, 'd').toDate();
  //     const pipeline = [
  //       {
  //         $match: {
  //           timeIn: {
  //             $gte: startDate.valueOf(),
  //             $lt: endDate.valueOf()
  //           },
  //           owner_id: userId
  //         }
  //       },
  //       {
  //         $group: {
  //           _id: null,
  //           hoursForDay: { $sum: { $subtract: ['$timeOut', '$timeIn'] } }
  //         }
  //       }
  //     ];

  //     const doc = await records.aggregate(pipeline).toArray();
  //     setHours(doc[0].hoursForDay);
  //   }

  //   getHours(date, userId);
  // }, []);

  return (
    <Fragment>
      {hours}
    </Fragment>
  )
}