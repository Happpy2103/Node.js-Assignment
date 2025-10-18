// src/components/Profile.jsx
import { useEffect, useState } from 'react';
import { authHeader } from '../auth/auth';
import { API_BASE } from '../config';

export default function Profile(){
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/employees/me`, {
          headers: { 'Content-Type': 'application/json', ...authHeader() }
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Error');
      }
    };
    fetchProfile();
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h3>Employee Profile</h3>
      <table className="table table-striped w-75">
        <tbody>
          <tr><th>ID</th><td>{profile._id || profile.id}</td></tr>
          <tr><th>Name</th><td>{profile.name}</td></tr>
          <tr><th>Email</th><td>{profile.email}</td></tr>
          <tr><th>Position</th><td>{profile.position || '—'}</td></tr>
          <tr><th>Phone</th><td>{profile.phone || '—'}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
