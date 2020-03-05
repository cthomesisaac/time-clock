import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { getWeeklyTotal } from '../../stitch';

export default function WeeklyTotal({ startDate, endDate, userId, unclockedHours }) {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const getTotalHours = async () => {
      const hours = await getWeeklyTotal(startDate, endDate, userId);
      if (dayjs().isSame(dayjs(startDate), 'w')) {
        setTotalHours((hours + unclockedHours).toFixed(1));
      } else {
        setTotalHours(parseFloat(hours).toFixed(1));
      }
    };

    getTotalHours();
  }, [startDate, endDate, userId, unclockedHours]);

  return (
    <>
      {totalHours}
    </>
  )
}
