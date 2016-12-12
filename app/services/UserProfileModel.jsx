"use strict";
var UserProfileModel = (function () {
    function UserProfileModel(data) {
        data = data || {};
        this.id = data.id || '';
        this.externalId = data.externalId || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.pictureSmallUrl = data.pictureSmallUrl || null;
        this.pictureLargeUrl = data.pictureLargeUrl || null;
    }
    UserProfileModel.fromOAUthProfile = function (data) {
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
    };
    Object.defineProperty(UserProfileModel.prototype, "fullName", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileModel.prototype, "username", {
        get: function () {
            return this.email;
        },
        enumerable: true,
        configurable: true
    });
    UserProfileModel.prototype.toData = function () {
        return {
            id: this.id,
            externalId: this.externalId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            pictureSmallUrl: this.pictureSmallUrl,
            pictureLargeUrl: this.pictureLargeUrl,
        };
    };
    return UserProfileModel;
}());
exports.UserProfileModel = UserProfileModel;
