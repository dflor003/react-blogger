export interface UserProfileOAuthData {
  name: string;
  given_name: string;
  family_name: string;
  gender: string;
  email: string;
  picture: string;
  picture_large: string;
  user_id: string;
}

export interface UserProfileData {
  id: string;
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureSmallUrl: string;
  pictureLargeUrl: string;
}

export class UserProfileModel {
  id: string;
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureSmallUrl: string;
  pictureLargeUrl: string;

  constructor(data?: Partial<UserProfileData>) {
    data = data || {};
    this.id = data.id || '';
    this.externalId = data.externalId || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.pictureSmallUrl = data.pictureSmallUrl || null;
    this.pictureLargeUrl = data.pictureLargeUrl || null;
  }

  static fromOAUthProfile(data: Partial<UserProfileOAuthData>) {
    data = data || {};
    return new UserProfileModel({
      id: null,
      externalId: data.user_id,
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
      pictureSmallUrl: data.picture,
      pictureLargeUrl: data.picture_large
    });
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get username() {
    return this.email;
  }

  toData(): any {
    return {
      id: this.id,
      externalId: this.externalId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      pictureSmallUrl: this.pictureSmallUrl,
      pictureLargeUrl: this.pictureLargeUrl,
    };
  }
}
