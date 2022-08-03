import React from 'react';
import * as BS from 'react-icons/bs';

export default function Search() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main
      className="
      flex justify-center items-center h-screen w-screen
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
            className="font-normal p-2 border border-black rounded-md"
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
    </main>
  );
}
