import React from 'react';

import BankedHours from './BankedHours';

export default function UserProfile({ userId }) {
  return (
    <div>
      <h3 className="mt-3 text-center">User Profile</h3>
      <BankedHours userId={userId} />
    </div>
  );
}
