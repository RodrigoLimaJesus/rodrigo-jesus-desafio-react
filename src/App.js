import { Route, Routes } from 'react-router-dom';
import Search from './pages/Search';

export default function App() {
  return (
    <div className="bg-slate-100 w-screen h-screen overflow-auto">
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </div>
  );
}
