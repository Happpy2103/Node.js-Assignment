function Child({ msg }) {
  return <p>Child says: {msg}</p>;
}

export default function NestedComponent() {
  return (
    <div>
      <h3>Nested Component Example</h3>
      <Child msg="Hello from the parent!" />
    </div>
  );
}
