export interface UserProfileData {
  name: string;
  given_name: string;
  family_name: string;
  gender: string;
  email: string;
  picture: string;
  picture_large: string;
  user_id: string;
}

export class UserProfileModel {

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureSmallUrl: string;
  pictureLargeUrl: string;

  constructor(data?: Partial<UserProfileData>) {
    data = data || {};
    this.id = data.user_id || '';
    this.firstName = data.given_name || '';
    this.lastName = data.family_name || '';
    this.email = data.email || '';
    this.pictureSmallUrl = data.picture || null;
    this.pictureLargeUrl = data.picture_large || null;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get username() {
    return this.email;
  }
}
