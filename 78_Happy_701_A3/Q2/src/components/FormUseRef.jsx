import { useRef } from 'react';

export default function FormUseRef() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Value entered: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form using useRef</h3>
      <input type="text" ref={inputRef} className="form-control" placeholder="Enter value" />
      <button className="btn btn-info mt-2">Submit</button>
    </form>
  );
}
