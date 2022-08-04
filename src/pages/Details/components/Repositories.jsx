import React from 'react';
import { GrBook } from 'react-icons/gr';

import ProjectCard from './ProjectCard';

export default function Repositories({ userRepos }) {
  const countRepos = userRepos.length;

  return (
    <div>
      <h2
        className="
        font-bold
        flex items-center
        border-b-4 border-b-orange-400
        w-fit pb-3 my-4
        "
      >
        <GrBook className="inline-block" />
        <span className="mx-2">Repositories</span>
        <span
          data-testid="count-repos"
          className="bg-slate-300 rounded-full p-1"
        >
          {countRepos <= 9 ? `0${countRepos}` : '+9'}
        </span>
      </h2>

      {countRepos === 0 ? (
        <span data-testid="no-repositories-found" className="pb-4">
          Parece que esta pessoa não possui nenhum repositório público.
        </span>
      ) : (
        userRepos.map((repoDetails) => (
          <ProjectCard key={repoDetails.name} repoDetails={repoDetails} />
        ))
      )}
    </div>
  );
}
