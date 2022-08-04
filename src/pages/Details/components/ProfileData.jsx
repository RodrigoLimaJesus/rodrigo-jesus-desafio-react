import React from 'react';
import { MdMailOutline, MdOutlinePeopleOutline } from 'react-icons/md';

export default function ProfileData({ userInfo }) {
  const { avatar_url, name, login, followers, following, email } = userInfo;

  return (
    <div className="flex flex-col my-4 md:mr-8 lg:mr-16">
      <img
        src={avatar_url}
        alt={`Profile ${name}`}
        className="rounded-full w-52"
      />

      <div className="flex flex-col">
        <span className="font-bold text-lg">{name}</span>
        <span className="text-slate-500">{login}</span>
      </div>

      <button
        type="button"
        className="
        transition
        bg-slate-300 hover:bg-slate-400
        font-bold
        p-1 my-3 w-44
        rounded-lg
        border border-slate-400"
      >
        Follow
      </button>

      <span className="font-bold my-2">@{login}</span>

      <div className="my-1">
        <MdOutlinePeopleOutline className="inline-block text-xl" />

        <span>
          <strong> {followers}</strong> followers
        </span>

        <span>
          <strong> - </strong>
        </span>
        <span>
          <strong>{following}</strong> following
        </span>
      </div>

      <span>
        <MdMailOutline className="inline-block text-xl" />
        <span> {email}</span>
      </span>
    </div>
  );
}
