import React from 'react';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ProfileData from './components/ProfileData';
import Repositories from './components/Repositories';

export default function Details({ userData }) {
  const navigate = useNavigate();
  const { userInfo, userRepos } = userData;

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <button
        data-testid="go-back-btn"
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center text-xl font-bold sm:text-2xl"
      >
        <BsArrowLeftSquare className="mr-2" /> Buscar novamente
      </button>

      {userData.userInfo ? (
        <main className="flex flex-col px-8 md:flex-row">
          {userData.userInfo && <ProfileData userInfo={userInfo} />}
          {userData.userRepos && <Repositories userRepos={userRepos} />}
        </main>
      ) : (
        <span className="text-red-500 font-bold">
          Parece que você não pesquisou nada.
        </span>
      )}
    </div>
  );
}
