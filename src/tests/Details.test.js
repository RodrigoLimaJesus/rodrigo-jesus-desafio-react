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
    expect(followers.textContent).toContain(`${userInfo.followers}`);

    const following = screen.getByTestId('user-count-following');
    expect(following).toBeInTheDocument();
    expect(following.textContent).toContain(`${userInfo.following}`);

    const email = screen.getByTestId('user-email');
    expect(email).toBeInTheDocument();
    expect(email.textContent).toContain(`${userInfo.email}`);
  });
});
