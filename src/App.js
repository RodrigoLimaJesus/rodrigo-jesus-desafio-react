import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';

export default function App() {
  const [userData, setUserData] = useState({});
  console.log(userData);
  return (
    <div className="bg-slate-100 w-screen h-screen overflow-auto">
      <Routes>
        <Route path="/" element={<Search setUserData={setUserData} />} />
        <Route
          path="/detalhes"
          element={<SearchResult userData={userData} />}
        />
      </Routes>
    </div>
  );
}
