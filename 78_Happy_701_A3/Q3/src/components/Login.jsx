import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken, getToken } from '../auth/auth';
import { API_BASE } from '../config';

export default function Login(){
  const navigate = useNavigate();
  const existing = getToken();
  if (existing) {
    navigate('/profile');
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const usernameRef = useRef();
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: usernameRef.current.value, password })
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({message:res.statusText}));
        throw new Error(err.message || 'Login failed');
      }

      const data = await res.json(); // assume { token: '...' }
      saveToken(data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3>Employee Login</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input ref={usernameRef} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" required />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        
      </div>
    </div>
  );
}
