import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Desktop from './Desktop';
import Boot from './Boot';
import Signup from './Signup';

const Pipeline = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Boot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </MemoryRouter>
  );
}

export default Pipeline