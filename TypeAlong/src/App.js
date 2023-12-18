import Home from './components/Home';
import Test from './components/Test';
import WIP from './components/WIP';
import Wait from './components/Wait';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wait" element={<Wait />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/solo/easy" element={<Test difficulty="easy" />} />
        <Route path="/solo/medium" element={<Test difficulty="medium" />} />
        <Route path="/solo/hard" element={<Test difficulty="hard" />} />
        <Route path="/multi/easy" element={<WIP />} />
        <Route path="/multi/medium" element={<WIP />} />
        <Route path="/multi/hard" element={<WIP />} />
      </Routes>
    </Router>
  );
}

export default App;