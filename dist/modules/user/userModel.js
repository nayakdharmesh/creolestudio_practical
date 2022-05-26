"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddressModel = exports.ChangePasswordModel = exports.UpdateUserModel = exports.LoginModel = exports.UserModel = void 0;
const class_validator_1 = require("class-validator");
const model_1 = require("../../model");
const userValidator_1 = require("./userValidator");
class UserModel extends model_1.Model {
    constructor(body) {
        super();
        const { fName, lName, email, password, gender } = body;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
        this.gender = gender;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "fName", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "lName", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: "EMAIL_INVALID" }),
    class_validator_1.Validate(userValidator_1.IsEmailemailExistConstraint, {
        message: "Email address already exists",
    }),
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "gender", void 0);
exports.UserModel = UserModel;
class LoginModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, password } = body;
        this.email = email;
        this.password = password;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], LoginModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], LoginModel.prototype, "password", void 0);
exports.LoginModel = LoginModel;
class UpdateUserModel extends model_1.Model {
    constructor(body) {
        super();
        const { fName, lName, profilePic, gender } = body;
        this.fName = fName;
        this.lName = lName;
        this.profilePic = profilePic;
        this.gender = gender;
    }
}
__decorate([
    class_validator_1.IsOptional()
], UpdateUserModel.prototype, "fName", void 0);
__decorate([
    class_validator_1.IsOptional()
], UpdateUserModel.prototype, "lName", void 0);
__decorate([
    class_validator_1.IsOptional()
], UpdateUserModel.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional()
], UpdateUserModel.prototype, "profilePic", void 0);
exports.UpdateUserModel = UpdateUserModel;
class ChangePasswordModel extends model_1.Model {
    constructor(body) {
        super();
        const { oldPassword, newPassword } = body;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], ChangePasswordModel.prototype, "oldPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ChangePasswordModel.prototype, "newPassword", void 0);
exports.ChangePasswordModel = ChangePasswordModel;
class CreateAddressModel extends model_1.Model {
    constructor(body) {
        super();
        const { title, addressLine1, addressLine2, country, state, city, pincode } = body;
        this.title = title;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.country = country;
        this.state = state;
        this.city = city;
        this.pincode = pincode;
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], CreateAddressModel.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CreateAddressModel.prototype, "addressLine1", void 0);
__decorate([
    class_validator_1.IsOptional()
], CreateAddressModel.prototype, "addressLine2", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CreateAddressModel.prototype, "country", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CreateAddressModel.prototype, "state", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CreateAddressModel.prototype, "city", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CreateAddressModel.prototype, "pincode", void 0);
exports.CreateAddressModel = CreateAddressModel;
//# sourceMappingURL=userModel.js.map