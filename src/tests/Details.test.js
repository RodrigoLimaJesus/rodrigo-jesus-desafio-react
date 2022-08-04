import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Details from '../pages/Details';
import { userInfo, userRepos } from './mocks/userMock';

describe('Testes para página de detalhes da pessoa usuária', () => {
  it('É sinalizado quando a pessoa usuária não possui repositórios', () => {
    const userData = { userInfo, userRepos: [] };
    render(<Details userData={userData} />, { wrapper: BrowserRouter });

    const emptyReposMessage = screen.getByTestId('no-repositories-found');
    expect(emptyReposMessage).toBeInTheDocument();
  });

  it('Os dados de perfil estão corretos', () => {
    const userData = { userInfo, userRepos: [] };
    render(<Details userData={userData} />, { wrapper: BrowserRouter });

    const userImage = screen.getByTestId('user-profile-image');
    expect(userImage).toBeInTheDocument();
    expect(userImage.src).toBe(userInfo.avatar_url);

    const userName = screen.getByTestId('user-profile-name');
    expect(userName).toBeInTheDocument();
    expect(userName.textContent).toBe(userInfo.name);

    const userLogin = screen.getByTestId('user-profile-login');
    expect(userLogin).toBeInTheDocument();
    expect(userLogin.textContent).toBe(userInfo.login);

    const followBtn = screen.getByTestId('follow-btn');
    expect(followBtn).toBeInTheDocument();

    const followers = screen.getByTestId('user-count-followers');
    expect(followers).toBeInTheDocument();
    expect(followers.textContent).toContain(String(userInfo.followers));

    const following = screen.getByTestId('user-count-following');
    expect(following).toBeInTheDocument();
    expect(following.textContent).toContain(String(userInfo.following));

    const email = screen.getByTestId('user-email');
    expect(email).toBeInTheDocument();
    expect(email.textContent).toContain(String(userInfo.email));
  });

  it('São mostrados os dados dos repositórios corretamente', () => {
    const userData = { userInfo, userRepos: userRepos };
    render(<Details userData={userData} />, { wrapper: BrowserRouter });

    const countRepos = screen.getByTestId('count-repos');
    expect(countRepos).toBeInTheDocument();
    expect(countRepos.textContent).toContain(String(userRepos.length));

    userRepos.forEach((repoDetails) => {
      const { name, html_url, description, topics, language, forks_count } =
        repoDetails;

      const repoName = screen.getByTestId(`repo-name-${name}`);
      expect(repoName).toBeInTheDocument();
      expect(repoName.textContent).toBe(name);
      expect(repoName.href).toBe(html_url);

      const repoDescription = screen.queryByTestId(`repo-description-${name}`);
      let descriptionText = null;
      if (repoDescription) {
        descriptionText = repoDescription.textContent;
      }
      expect(descriptionText).toBe(description);

      topics.forEach((topic) => {
        const repoTopic = screen.getByTestId(`repo-topic-${topic}-${name}`);
        expect(repoTopic.textContent).toBe(topic);
      });

      const repoLanguage = screen.queryByTestId(`repo-language-${name}`);
      let languageText = null;
      if (repoLanguage) {
        languageText = repoLanguage.textContent;
      }
      expect(languageText).toBe(language);

      const repoForkCount = screen.getByTestId(`repo-forkCount-${name}`);
      expect(repoForkCount.textContent).toContain(String(forks_count));

      const repoUpdatedAt = screen.getByTestId(`repo-updateAt-${name}`);
      expect(repoUpdatedAt).toBeInTheDocument();
    });
  });
});
