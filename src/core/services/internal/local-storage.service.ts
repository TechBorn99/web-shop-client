const AuthKeys = {
  user: 'user',
  token: 'token',
};

class LocalStorageService {
  signUserIn({ token }: { token: string }): void {
    localStorage.removeItem(AuthKeys.token);
    localStorage.setItem(AuthKeys.token, token);
  }

  updateAccessToken(token: string): void {
    localStorage.removeItem(AuthKeys.token);
    localStorage.setItem(AuthKeys.token, token);
  }

  clearUser(): void {
    localStorage.removeItem(AuthKeys.token);
    localStorage.removeItem(AuthKeys.user);
  }

  getSignedUser(): { token: string } | null {
    if (!localStorage.getItem(AuthKeys.token)) {
      return null;
    }

    return {
      token: localStorage.getItem(AuthKeys.token) ?? '',
    };
  }
}

export default new LocalStorageService();
