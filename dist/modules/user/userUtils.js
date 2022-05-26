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
exports.userUtils = void 0;
const sql = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
const responseBuilder_1 = require("../../helpers/responseBuilder");
class userUtils {
    createUser(userDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield sql.insert(tables_1.Tables.CUSTOMER, userDetail);
            return responseBuilder_1.ResponseBuilder.data({ id: newUser.insertId });
        });
    }
    getUserDetailByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.CUSTOMER}`;
            const user = yield sql.first(model, ["*"], "email = ? AND isActive = '1'", [
                email,
            ]);
            return responseBuilder_1.ResponseBuilder.data(user);
        });
    }
    getUserDetailById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.CUSTOMER}`;
            const user = yield sql.first(model, ["*"], "id = ? AND isActive = '1'", [
                id,
            ]);
            return responseBuilder_1.ResponseBuilder.data(user);
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.CUSTOMER}`;
            return yield sql.updateFirst(model, data, "id = ?", [id]);
        });
    }
    insertAddress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.CUSTOMERHASADDRESS}`;
            return yield sql.insertMany(model, data);
        });
    }
    getAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.CUSTOMERHASADDRESS}`;
            const data = yield sql.findAll(model, ["*"], "customerId = ? AND isDelete = '0' ", [id]);
            return responseBuilder_1.ResponseBuilder.data(data);
        });
    }
    updateAddress(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = `${tables_1.Tables.CUSTOMERHASADDRESS}`;
            return yield sql.updateFirst(model, data, "id = ?", [id]);
        });
    }
}
exports.userUtils = userUtils;
//# sourceMappingURL=userUtils.js.map