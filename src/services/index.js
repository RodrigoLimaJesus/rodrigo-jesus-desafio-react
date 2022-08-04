import axios from 'axios';
const URL_BASE = 'https://api.github.com/users';

export async function getUserData(username) {
  try {
    const [userInfo, userRepos] = await Promise.all([
      axios.get(`${URL_BASE}/${username}`),
      axios.get(`${URL_BASE}/${username}/repos`),
    ]);

    return { userInfo: userInfo.data, userRepos: userRepos.data };
  } catch (error) {
    return { message: error.message || 'Erro interno' };
  }
}
