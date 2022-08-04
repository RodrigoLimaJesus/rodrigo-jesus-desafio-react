import React, { useState } from 'react';
import * as BS from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import getUserData from '../../services/getUserData';

export default function Search({ setUserData }) {
  const [inputValue, setInputValue] = useState('');
  const [showEmptyUserError, setShowEmptyUserError] = useState(false);
  const [showInvalidUserError, setShowInvalidUserError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length > 0) {
      const data = await getUserData(inputValue);

      if ('message' in data) {
        setShowInvalidUserError(true);
      } else {
        setUserData(data);
        navigate('/detalhes');
      }
    } else {
      setShowEmptyUserError(true);
    }
  };

  return (
    <main
      className="
      flex flex-col justify-center items-center h-screen w-screen
      md:text-lg
      lg:text-xl
      "
    >
      <form onSubmit={handleSubmit} className="flex items-end">
        <label
          htmlFor="input-username"
          className="flex flex-col font-bold mr-4"
        >
          Buscar Repositório no github
          <input
            placeholder="digite o nome do usuário"
            id="input-username"
            type="text"
            value={inputValue}
            onChange={({ target }) => {
              setInputValue(target.value);
              setShowEmptyUserError(false);
              setShowInvalidUserError(false);
            }}
            className="font-normal p-2 mt-2 border border-black rounded-md"
          />
        </label>

        <button
          type="submit"
          className="
          flex items-center
          transition
          bg-gray-500 hover:bg-gray-700
          text-white
          p-2
          rounded-md
          "
        >
          <BS.BsSearch className="mr-2" />
          Buscar
        </button>
      </form>

      {showEmptyUserError && (
        <span className="text-red-500 mt-4">
          Informe um nome de usuário válido no github.
        </span>
      )}
      {showInvalidUserError && (
        <span className="text-red-500 mt-4">
          Usuário não encontrado no github. Verifique se você digitou o nome
          corretamente.
        </span>
      )}
    </main>
  );
}
