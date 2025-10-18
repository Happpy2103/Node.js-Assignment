import { useState } from 'react';

export default function LiveFilter() {
  const [search, setSearch] = useState('');
  const users = ['Happy', 'Patel', 'Admin', 'USER', 'TEST'];

  const filtered = users.filter((u) => u.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h3>Live Search Filter</h3>
      <input
        type="text"
        className="form-control"
        placeholder="Search user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group mt-2">
        {filtered.map((u, i) => (
          <li className="list-group-item" key={i}>{u}</li>
        ))}
      </ul>
    </div>
  );
}
