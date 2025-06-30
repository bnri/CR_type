"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthProvider = exports.OauthUserType = void 0;
// export type providerEnum = 'google' | 'naver' | 'kakao';
var OauthUserType;
(function (OauthUserType) {
    OauthUserType["CHILD"] = "child";
    OauthUserType["PARENT"] = "parent";
    OauthUserType["ADMIN"] = "admin";
})(OauthUserType || (exports.OauthUserType = OauthUserType = {}));
var OauthProvider;
(function (OauthProvider) {
    OauthProvider["GOOGLE"] = "google";
    OauthProvider["NAVER"] = "naver";
    OauthProvider["KAKAO"] = "kakao";
})(OauthProvider || (exports.OauthProvider = OauthProvider = {}));
