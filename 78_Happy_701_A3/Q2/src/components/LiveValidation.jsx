import { useState } from 'react';

export default function LiveValidation() {
  const [email, setEmail] = useState('');
  const isValid = email.includes('@');

  return (
    <div>
      <h3>Live Email Validation</h3>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <p className={isValid ? 'text-success' : 'text-danger'}>
        {isValid ? 'Valid Email ✅' : 'Invalid Email ❌'}
      </p>
    </div>
  );
}
