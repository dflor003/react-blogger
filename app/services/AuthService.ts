import Auth0Lock from 'auth0-lock';
import { hashHistory, HistoryBase } from 'react-router'
import storageService, { StorageService } from './StorageService';

import logger from '../../server/utils/logger/logger';
import { UserProfileModel, UserProfileData } from './UserProfileModel';


const log = logger('AUTH');
const TokenKey = 'id_token';
const ProfileKey = 'user_profile';

export default class AuthService {
  private history: HistoryBase;
  private storage: StorageService;
  private lock: any;

  constructor(clientId: string, domain: string, storage = storageService(), history = hashHistory) {
    this.storage = storage;
    this.history = history;
    this.lock = new Auth0Lock(clientId, domain, {
      auth: <any>{
        redirectUrl: 'http://localhost:3000/',
        responseType: 'token',
        connectionScopes: {
          'facebook': ['public_profile', 'email']
        },
        params: {
        },
      },
    });

    this.lock.on('authenticated', result => this.authenticate(result));
    this.lock.on('authorization_error', error => this.authFailed(error));
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
    this.storage.remove(TokenKey);
  }

  getToken(): string {
    return this.storage.get<string>(TokenKey);
  }

  setToken(idToken: string): void {
    this.storage.set(TokenKey, idToken);
  }

  getProfile(): UserProfileModel {
    const userProfileData = this.storage.get<UserProfileData>(ProfileKey);
    return new UserProfileModel(userProfileData);
  }

  setProfile(profile: UserProfileData): void {
    this.storage.set(ProfileKey, profile);
  }

  private async authenticate(authResult: any): Promise<void> {
    log.info(`User authenticated successfully!`);
    log.trace(`Auth info`, authResult);
    const { idToken } = authResult;
    this.setToken(idToken);
    this.history.replace('/home');

    try {
      const profile = await this.fetchProfile(idToken);
      log.info(`User profile fetched successfully`, profile);
      this.setProfile(profile);
    } catch(error) {
      log.error(`Error retrieving profile`, error);
    }
  }

  private authFailed(err) : void {
    log.error(`Failed to log user in`, err);
  }

  private fetchProfile(idToken: string): Promise<UserProfileData> {
    return new Promise((resolve, reject) => this.lock.getProfile(idToken, (error, profile) => {
      if (error) {
        return reject(error);
      }

      return resolve(profile);
    }));
  }
}
