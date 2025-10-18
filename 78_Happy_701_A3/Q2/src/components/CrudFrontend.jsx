import { useState, useEffect } from 'react';

export default function CrudFrontend() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name }),
    });
    setName('');
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h3>CRUD Frontend</h3>
      <form onSubmit={addUser}>
        <input type="text" className="form-control" placeholder="Enter user name"
          value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn btn-primary mt-2">Add User</button>
      </form>

      <ul className="list-group mt-3">
        {users.map((u) => <li className="list-group-item" key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}
