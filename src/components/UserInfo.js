import { api } from "../pages/index.js";

export default class UserInfo {
  constructor(user, { userNameSelector, userDescriptionSelector, userProfilePhotoSelector }) {
    this._id = user._id;
    this._name = user.name;
    this._description = user.about;
    this._profilePhoto = user.avatar;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userProfilePhotoElement = document.querySelector(userProfilePhotoSelector);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
      userPhoto: this._userProfilePhotoElement.src
    };

    return userInfo;
  }

  setUserInfo({ userName = this._name, userDescription = this._description, userProfilePhoto = this._profilePhoto }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;

    if (this._userProfilePhotoElement.src !== userProfilePhoto) {
      this._userProfilePhotoElement.src = userProfilePhoto;
    }
  }

  setUserPhoto(userProfilePhoto = this._profilePhoto) {
    if (this._userProfilePhotoElement.src !== userProfilePhoto) {
      this._userProfilePhotoElement.src = userProfilePhoto;
    }
  }

  sendUserInfo({ userName = this._name, userDescription = this._description }) {
    return api.setUserInfo({ userName, userDescription });
  }

  updateUserPhoto(userPhoto) {
    return api.updateProfilePhoto(userPhoto);
  }
}