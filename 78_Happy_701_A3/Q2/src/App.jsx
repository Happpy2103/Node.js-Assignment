import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ConditionalRendering from './components/ConditionalRendering';
import ListComponent from './components/ListComponent';
import NestedComponent from './components/NestedComponent';
import FormUseState from './components/FormUseState';
import FormUseRef from './components/FormUseRef';
import DigitalClock from './components/DigitalClock';
import LiveValidation from './components/LiveValidation';
import LiveFilter from './components/LiveFilter';
import CrudFrontend from './components/CrudFrontend';

export default function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">React Assignment</h1>

        <nav className="nav nav-pills justify-content-center mb-4">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/conditional">Conditional</Link>
          <Link className="nav-link" to="/list">List</Link>
          <Link className="nav-link" to="/nested">Nested</Link>
          <Link className="nav-link" to="/form-usestate">Form useState</Link>
          <Link className="nav-link" to="/form-useref">Form useRef</Link>
          <Link className="nav-link" to="/clock">Digital Clock</Link>
          <Link className="nav-link" to="/validation">Live Validation</Link>
          <Link className="nav-link" to="/filter">Live Filter</Link>
          <Link className="nav-link" to="/crud">CRUD</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/conditional" element={<ConditionalRendering />} />
          <Route path="/list" element={<ListComponent />} />
          <Route path="/nested" element={<NestedComponent />} />
          <Route path="/form-usestate" element={<FormUseState />} />
          <Route path="/form-useref" element={<FormUseRef />} />
          <Route path="/clock" element={<DigitalClock />} />
          <Route path="/validation" element={<LiveValidation />} />
          <Route path="/filter" element={<LiveFilter />} />
          <Route path="/crud" element={<CrudFrontend />} />
        </Routes>
      </div>
    </Router>
  );
}
