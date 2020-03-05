import React from 'react';

export default function DailyTotal({ dailyTotal, hasClockedIn, records }) {
  if (hasClockedIn) {
    const unclockedHours = (new Date() - records[0].timeIn) / 3600000;
    dailyTotal += unclockedHours;
  }

  return (
    <>
      {parseFloat(dailyTotal).toFixed(1)}
    </>
  )
}
