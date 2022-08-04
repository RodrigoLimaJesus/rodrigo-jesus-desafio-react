import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Search from './pages/Search';

export default function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="bg-slate-100 w-screen h-screen overflow-auto">
      <Routes>
        <Route path="/" element={<Search setUserData={setUserData} />} />
        <Route path="/detalhes" element={<Details userData={userData} />} />
      </Routes>
    </div>
  );
}
