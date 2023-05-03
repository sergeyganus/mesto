export default class UserInfo {
  constructor(user, { userNameSelector, userDescriptionSelector, userProfilePhotoSelector }, { handleUserInfo, handleUserPhoto }) {
    this._id = user._id;
    this._name = user.name;
    this._description = user.about;
    this._profilePhoto = user.avatar;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userProfilePhotoElement = document.querySelector(userProfilePhotoSelector);
    this._handleUserInfo = handleUserInfo;
    this._handleUserPhoto = handleUserPhoto;
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

    this.setUserPhoto(userProfilePhoto);
  }

  setUserPhoto(userProfilePhoto = this._profilePhoto) {
    if (this._userProfilePhotoElement.src !== userProfilePhoto) {
      this._userProfilePhotoElement.src = userProfilePhoto;
    }
  }

  sendUserInfo({ userName = this._name, userDescription = this._description }) {
    return this._handleUserInfo({ userName, userDescription });
  }

  updateUserPhoto(userPhoto) {
    this._profilePhoto = userPhoto;
    return this._handleUserPhoto(userPhoto);
  }
}