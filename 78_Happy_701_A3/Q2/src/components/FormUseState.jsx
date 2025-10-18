import { useState } from 'react';

export default function FormUseState() {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form using useState</h3>
      <input
        type="text"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-success mt-2">Submit</button>
    </form>
  );
}
