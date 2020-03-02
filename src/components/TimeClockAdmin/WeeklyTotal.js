import React, { useState, useEffect } from 'react';

import { getWeeklyTotal } from '../../stitch';

export default function WeeklyTotal({ startDate, endDate, userId }) {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const getTotalHours = async () => {
      const hours = await getWeeklyTotal(startDate, endDate, userId);
      setTotalHours(hours.toFixed(1));
    };

    getTotalHours();
  }, [startDate, endDate, userId]);

  return (
    <>
      {totalHours}
    </>
  )
}
