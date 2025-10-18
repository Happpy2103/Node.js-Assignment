import { useState } from 'react';

export default function ConditionalRendering() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <h3>Conditional Rendering</h3>
      {loggedIn ? <p>Welcome back, Happy!</p> : <p>Please log in.</p>}
      <button className="btn btn-primary mt-2" onClick={() => setLoggedIn(!loggedIn)}>
        Toggle Login
      </button>
    </div>
  );
}
