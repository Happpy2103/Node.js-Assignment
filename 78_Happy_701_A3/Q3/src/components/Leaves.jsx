// src/components/Leaves.jsx
import { useEffect, useState } from 'react';
import { authHeader } from '../auth/auth';
import { API_BASE } from '../config';

export default function Leaves(){
  const [leaves, setLeaves] = useState([]);
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchLeaves(){
    try {
      const res = await fetch(`${API_BASE}/leaves`, { headers: { 'Content-Type': 'application/json', ...authHeader() } });
      if (!res.ok) throw new Error('Failed to load leaves');
      const data = await res.json();
      setLeaves(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { fetchLeaves(); }, []);

  const addLeave = async (e) => {
    e.preventDefault();
    setError('');
    if (!date || !reason) { setError('Please provide date and reason'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/leaves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ date, reason, grant: false })
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>({message:res.statusText}));
        throw new Error(err.message || 'Failed to add leave');
      }
      setDate(''); setReason('');
      fetchLeaves();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleGrant = async (id, current) => {
    try {
      const res = await fetch(`${API_BASE}/leaves/${id}/grant`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ grant: !current })
      });
      if (!res.ok) throw new Error('Failed to update');
      fetchLeaves();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteLeave = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/leaves/${id}`, {
        method: 'DELETE',
        headers: { ...authHeader() }
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchLeaves();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Leave Applications</h3>

      <form className="row g-2 w-75 mb-3" onSubmit={addLeave}>
        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Reason</label>
          <input className="form-control" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason for leave" required />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-success w-100" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
        </div>
      </form>

      {error && <div className="alert alert-danger w-75">{error}</div>}

      <div className="w-75">
        <h5>All Leaves</h5>
        {leaves.length === 0 && <div className="text-muted">No leave applications found.</div>}

        <table className="table">
          <thead>
            <tr><th>Date</th><th>Reason</th><th>Granted</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {leaves.map(l => (
              <tr key={l._id || l.id}>
                <td>{(new Date(l.date)).toLocaleDateString()}</td>
                <td>{l.reason}</td>
                <td>{l.grant ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>toggleGrant(l._id || l.id, l.grant)}>
                    {l.grant ? 'Revoke' : 'Grant'}
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteLeave(l._id || l.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
