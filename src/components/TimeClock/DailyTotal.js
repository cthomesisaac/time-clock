import React, { useState, useEffect } from 'react';

import { getDailyReport } from '../../stitch';

export default function DailyTotal({ startDate, endDate, currentUser, altValue }) {
  const [valueToShow, setValueToShow] = useState(altValue);

  useEffect(() => {
    async function fetchReport() {
      const report = await getDailyReport(startDate, endDate, currentUser.id);
      updateValueToShow(report);
    }

    function updateValueToShow(report) {
      if (!report[0].timeOut) {
        const newValue = ((new Date() - report[0].timeIn) / 3600000).toFixed(1);
        setValueToShow(altValue + newValue);
      }
    }

    // fetchReport();
  }, [startDate, endDate, currentUser, altValue]);

  return (
    <>
      {valueToShow}
    </>
  )
}
