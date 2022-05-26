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
exports.Middleware = void 0;
const _ = require("lodash");
// import { Encrypt } from "./helpers/encrypt";
const jwt_1 = require("./helpers/jwt");
const l10n = require("jm-ez-l10n");
const sql = require("jm-ez-mysql");
const tables_1 = require("./config/tables");
class Middleware {
    constructor() {
        this.getUserAuthorized = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers["x-auth-token"];
            if (authorization && !_.isEmpty(authorization)) {
                try {
                    const tokenInfo = jwt_1.Jwt.decodeAuthToken(authorization.toString());
                    if (tokenInfo) {
                        const user = yield sql.first(tables_1.Tables.CUSTOMER, ["*"], "id = ?", [
                            tokenInfo.userId,
                        ]);
                        if (user) {
                            req.body._user = user;
                            next();
                        }
                        else {
                            res.status(401).json({ error: l10n.t("ERR_UNAUTH"), code: 401 });
                            return;
                        }
                    }
                    else {
                        res.status(401).json({ error: l10n.t("ERR_UNAUTH"), code: 401 });
                        return;
                    }
                }
                catch (error) {
                    console.log(error);
                    res
                        .status(500)
                        .json({ error: l10n.t("ERR_INTERNAL_SERVER"), code: 500 });
                    return;
                }
            }
            else {
                res.status(401).json({ error: l10n.t("ERR_UNAUTH"), code: 401 });
                return;
            }
        });
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map