import React, { useState } from 'react';

export default function BankedHours({ user, editUser }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!user.bankedHours) {
    user.bankedHours = 0;
  }

  function toggleEditing() {
    setIsEditing(state => !state);
  }

  return (
    <>
      {isEditing ? <BankedHoursEdit user={user} toggleEditing={toggleEditing} editUser={editUser} /> : <BankedHoursView user={user} toggleEditing={toggleEditing} />}
    </>
  );
}

function BankedHoursView({ user, toggleEditing }) {
  return (
    <div>
      Banked Hours: {user.bankedHours.toFixed(2) || 0}
      <button className="button-link" onClick={toggleEditing}>Edit</button>
    </div>
  );
}

function BankedHoursEdit({ user, toggleEditing, editUser }) {
  const [input, setInput] = useState(user.bankedHours.toFixed(2) || 0);
  
  function onChange(event) {
    setInput(event.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (parseFloat(input) !== user.bankedHours) {
      await editUser(user.user_id, parseFloat(input));
      toggleEditing();
    } else {
      toggleEditing();
    }
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className="mr-1">Banked Hours:</label>
        <input type="text" value={input} onChange={onChange} size={2} />
        <button type="submit" className="button-link">Save</button>
      </form>
    </div>
  )
}
