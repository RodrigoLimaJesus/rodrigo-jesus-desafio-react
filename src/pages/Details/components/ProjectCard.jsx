import React from 'react';
import { BiGitRepoForked } from 'react-icons/bi';

export default function ProjectCard({ repoDetails }) {
  const {
    name,
    html_url,
    language,
    forks_count,
    updated_at,
    description,
    topics,
  } = repoDetails;

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  function getDateDetails(date) {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { day, month, year, hours, minutes };
  }

  function handleRepoUpdatedAt() {
    const { day, month, year, hours, minutes } = getDateDetails(
      new Date(updated_at),
    );
    const currentDate = getDateDetails(new Date());

    if (year < currentDate.year) {
      return `Updated on ${day} ${months[month]} ${year}`;
    } else if (month < currentDate.month) {
      return `Updated on ${day} ${months[month]}`;
    } else if (currentDate.day - day > 1) {
      return `Updated ${currentDate.day - day} days ago`;
    } else if (currentDate.day - day === 1) {
      return `Updated ${currentDate.day - day} day ago`;
    } else if (currentDate.hours - hours > 0) {
      return `Updated ${currentDate.hours - hours} hours ago`;
    } else {
      return `Updated ${currentDate.minutes - minutes} minutes ago`;
    }
  }

  return (
    <div
      className="
      my-4 p-2
      flex flex-col
      border border-black
      rounded-lg
      md:mr-[10vw]
      "
    >
      <a
        data-testid={`repo-name-${name}`}
        href={html_url}
        target="_blank"
        rel="noreferrer"
        className="text-xl text-sky-700 font-bold mb-3 hover:underline w-fit"
      >
        {name}
      </a>

      {description && (
        <p
          data-testid={`repo-description-${name}`}
          className="mb-3 text-slate-600"
        >
          {description}
        </p>
      )}

      <ul className="flex flex-wrap mb-3">
        {topics.map((topic) => (
          <li
            data-testid={`repo-topic-${topic}-${name}`}
            key={`${topic}-${name}`}
            className="m-1 py-1 px-2 bg-sky-600 text-white rounded-lg"
          >
            {topic}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap font-bold">
        {language && (
          <span
            data-testid={`repo-language-${name}`}
            className="text-orange-700"
          >
            {language}
          </span>
        )}

        <span data-testid={`repo-forkCount-${name}`} className="mx-3">
          <BiGitRepoForked className="inline-block" />
          <span>{forks_count}</span>
        </span>

        <span data-testid={`repo-updateAt-${name}`}>
          {handleRepoUpdatedAt()}
        </span>
      </div>
    </div>
  );
}
