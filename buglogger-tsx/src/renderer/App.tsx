import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LogMain from './LogMain'
import Hello from './Hello';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogMain />} />
				<Route path="/hello" element={<Hello />} />
      </Routes>
    </Router>
  );
}
