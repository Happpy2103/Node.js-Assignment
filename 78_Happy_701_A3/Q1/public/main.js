// main.js (JSX, transpiled by Babel in-browser)
// Uses React from CDN

const { useState } = React;

/* Component 1: Header */
function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

/* Component 2: Footer */
function Footer({ copyrightText }) {
  return (
    <footer className="footer">
      <small>{copyrightText}</small>
    </footer>
  );
}

/* Small interactive component to show dynamic usage */
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ marginTop: 12 }}>
      <p>Interactive counter: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>+1</button>
      <button className="btn btn-muted" onClick={() => setCount(c => c - 1)}>-1</button>
    </div>
  );
}

/* Main App uses the two components */
function App() {
  return (
    <div className="container">
      <Header
        title="Node.js Assignment — CDN Components"
        subtitle="Header & Footer built as React components loaded via CDN"
      />

      <main className="content">
        <h3>What this demo does</h3>
        <p>
          This Node.js server (Express) serves a static frontend. The frontend uses React and ReactDOM
          loaded from a CDN; components are defined in <code>main.js</code> and transpiled by Babel in the browser.
        </p>
        <Counter />
        <p style={{ marginTop: 12 }}>
          You can inspect the components in <code>public/main.js</code>. This approach requires no npm frontend build.
        </p>
      </main>

    </div>
  );
}

/* Render the App into #root */
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
