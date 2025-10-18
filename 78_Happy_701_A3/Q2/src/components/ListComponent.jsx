export default function ListComponent() {
  const fruits = ['Apple', 'Banana', 'Mango', 'Grapes'];
  return (
    <div>
      <h3>List Rendering</h3>
      <ul className="list-group">
        {fruits.map((fruit, index) => (
          <li className="list-group-item" key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
