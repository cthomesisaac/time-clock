import React, { useState, useEffect, Fragment } from 'react';

import { getWeeklyBankedHours } from '../../stitch/mongodb';

export default function WeeklyBankedHours({ start, end, userId }) {
  const [weeklyBankedHours, setWeeklyBankedHours] = useState({
    hoursAdded: 0,
    hoursSubtracted: 0,
    totalChange: 0
  });

  useEffect(() => {
    const fetchWeeklyBankedHours = async () => {
      const res = await getWeeklyBankedHours(start, end, userId);
      console.log(res);
      setWeeklyBankedHours(res[0] || res);
    };

    fetchWeeklyBankedHours();
  }, [start, end, userId]);

  return (
    <Fragment>
      <td>{weeklyBankedHours.hoursAdded || 0}</td>
      <td>{weeklyBankedHours.hoursSubtracted || 0}</td>
      <td>{weeklyBankedHours.totalChange || 0}</td>
    </Fragment>
  )
}
