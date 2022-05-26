"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const bcryptjs = require("bcryptjs");
const sql = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
const userUtils_1 = require("./userUtils");
const responseBuilder_1 = require("../../helpers/responseBuilder");
const constants_1 = require("../../config/constants");
class UserMiddleware {
    constructor() {
        this.userUtils = new userUtils_1.userUtils();
        this.isCheckEmailAddress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                const user = yield sql.first(tables_1.Tables.CUSTOMER, ["*"], "email = ? AND isActive = '1'", [
                    req.body.email,
                ]);
                if (user && user.id) {
                    next();
                }
                else {
                    return res
                        .status(constants_1.Constants.UNAUTHORIZED_CODE)
                        .json(responseBuilder_1.ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST_SYSTEM")));
                }
            }
            else {
                return res
                    .status(constants_1.Constants.UNAUTHORIZED_CODE)
                    .json(responseBuilder_1.ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST_SYSTEM")));
            }
        });
        this.checkCredentials = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userUtils.getUserDetailByEmail(req.body.email);
            // check credentials matches or not
            if (user &&
                user.result &&
                user.result.id &&
                (yield bcryptjs.compare(req.body.password, user.result.password))) {
                req.body._user = user.result;
                next();
            }
            else {
                return res
                    .status(constants_1.Constants.UNAUTHORIZED_CODE)
                    .json(responseBuilder_1.ResponseBuilder.badRequest(req.t("INVALID_CREDENTIALS")));
            }
        });
        this.oldAndNewPasswordCheck = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userUtils.getUserDetailById(req.body._user.id);
            // check credentials matches or not
            if (user &&
                user.result &&
                user.result.id &&
                (yield bcryptjs.compare(req.body.oldPassword, user.result.password))) {
                next();
            }
            else {
                return res
                    .status(constants_1.Constants.UNAUTHORIZED_CODE)
                    .json(responseBuilder_1.ResponseBuilder.badRequest(req.t("ERR_INVALID_PASSWORD")));
            }
        });
    }
}
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=userMiddleware.js.map