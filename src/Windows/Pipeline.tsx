import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Desktop from './Desktop';
import Boot from './Boot';
import Signup from './Signup';
import Register from './Register';

const Pipeline = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Boot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </MemoryRouter>
  );
}

export default Pipeline