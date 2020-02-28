import React, { useState, useEffect } from 'react';

import { getUser } from '../../stitch';

export default function BankedHours({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(userId).then(user => setUser(user));
  }, [userId]);

  return (
    <span>
      Banked Hours: {user ? user.bankedHours : 0}
    </span>
  );
}
