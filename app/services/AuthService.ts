import Auth0Lock from 'auth0-lock';
import { hashHistory, HistoryBase } from 'react-router'

const TokenKey = 'id_token';

export class AuthService {
  private history: HistoryBase;
  private storage: Storage;
  private lock: any;

  constructor(clientId: string, domain: string, storage = sessionStorage, history = hashHistory) {
    this.storage = storage;
    this.history = history;
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    });

    this.lock.on('authenticated', result => this.authenticate(result))
  }

  username(): string {
    return 'Bob Builder';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(): void {
    this.lock.show();
  }

  logout(): void {
    this.storage.removeItem(TokenKey);
  }

  setToken(idToken: string): void {
    this.storage.setItem(TokenKey, idToken);
  }

  getToken(): string {
    return this.storage.getItem(TokenKey);
  }

  private authenticate(authResult: any): void {
    console.log(authResult);
    const { idToken } = authResult;
    this.setToken(idToken);
    this.history.replace('/home');
  }
}

let instance: AuthService = null;
export function initAuth(clientId: string, domain: string) {
  instance = new AuthService(clientId, domain);
  return instance;
}

export default function () {
  if (!instance) {
    throw new Error('Not initialized');
  }

  return instance;
}
