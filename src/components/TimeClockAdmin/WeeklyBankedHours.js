import React, { useState, useEffect, Fragment } from 'react';

import { getWeeklyBankedHours } from '../../stitch/mongodb';

export default function WeeklyBankedHours({ start, userId }) {
  const [weeklyBankedHours, setWeeklyBankedHours] = useState({
    hoursForWeek: 0,
    netChange: 0
  });

  useEffect(() => {
    const fetchWeeklyBankedHours = async () => {
      const res = await getWeeklyBankedHours(start, userId);
      setWeeklyBankedHours({
        hoursForWeek: res.hoursForWeek,
        netChange: res.netChange.amountChanged || 0
      });
    };

    fetchWeeklyBankedHours();
  }, [start, userId]);

  return (
    <Fragment>
      <td>{weeklyBankedHours.hoursForWeek.toFixed(2)}</td>
      <td>{weeklyBankedHours.netChange.toFixed(2)}</td>
    </Fragment>
  )
}
