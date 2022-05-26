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
exports.userController = void 0;
const constants_1 = require("../../config/constants");
const responseBuilder_1 = require("../../helpers/responseBuilder");
const userUtils_1 = require("./userUtils");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("../../helpers/jwt");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Uploads is the Upload_folder_name
//     cb(null, "./../bower_components/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//   },
// });
// const maxSize = 1 * 1000 * 1000;
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
//   fileFilter: function (req, file, cb) {
//     // Set the filetypes, it is optional
//     var filetypes = /jpeg|jpg|png/;
//     var mimetype = filetypes.test(file.mimetype);
//     var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(
//       "Error: File upload only supports the " +
//         "following filetypes - " +
//         filetypes
//     );
//   },
//   // mypic is the name of file attribute
// }).single("mypic");
class userController {
    constructor() {
        this.userUtils = new userUtils_1.userUtils();
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.password = bcryptjs.hashSync(req.body.password.toString(), constants_1.Constants.PASSWORD_HASH);
                const result = yield this.userUtils.createUser(req.body);
                return res
                    .status(result.code)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("SIGNUP"), {}));
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const details = {
                    token: jwt_1.Jwt.getAuthToken({
                        userId: req.body._user.id,
                        email: req.body._user.email,
                    }),
                    email: req.body._user.email,
                };
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("MSG_USER_SIGN_IN"), details));
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userUtils.getUserDetailById(req.body._user.id);
                if (user.result && user.result.profilePic) {
                    user.result.profilePic = `localhost:7000/uploads/${user.result.profilePic}`;
                }
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("MSG_USER_SIGN_IN"), user.result));
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.updateProfilePic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.file :", req.file);
                return res.status(200).json(responseBuilder_1.ResponseBuilder.successMessage(req.t("PROFILE_PIC"), {
                    data: req.file.filename,
                }));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { fName, lName, profilePic, gender } = req.body;
                const reqObj = {};
                if (fName) {
                    reqObj["fName"] = fName;
                }
                if (lName) {
                    reqObj["lName"] = lName;
                }
                if (profilePic) {
                    reqObj["profilePic"] = profilePic;
                }
                if (gender) {
                    reqObj["gender"] = gender;
                }
                console.log(reqObj);
                yield this.userUtils.updateById(req.body._user.id, reqObj);
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("USER_UPDATED_SUCCESS"), {}));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { newPassword } = req.body;
                newPassword = bcryptjs.hashSync(newPassword.toString(), constants_1.Constants.PASSWORD_HASH);
                yield this.userUtils.updateById(req.body._user.id, {
                    password: newPassword,
                });
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("PASS_CHANGE"), {}));
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.addressAdd = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all((req.body.addressData = req.body.addressData.map((data) => {
                    data.customerId = req.body._user.id;
                    return data;
                })));
                yield this.userUtils.insertAddress(req.body.addressData);
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("ADD_ADDRESS"), {}));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.addressGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userUtils.getAddress(req.body._user.id);
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("ADD_ADDRESS"), data.result));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.updateAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { title, addressLine1, addressLine2, country, state, city, pincode } = req.body;
                let updateData = {};
                if (title) {
                    updateData["title"] = title;
                }
                if (addressLine1) {
                    updateData["addressLine1"] = addressLine1;
                }
                if (addressLine2) {
                    updateData["addressLine2"] = addressLine2;
                }
                if (country) {
                    updateData["country"] = country;
                }
                if (state) {
                    updateData["state"] = state;
                }
                if (city) {
                    updateData["city"] = city;
                }
                if (pincode) {
                    updateData["pincode"] = pincode;
                }
                yield this.userUtils.updateAddress(req.query.id, updateData);
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("UPDATE_ADDRESS"), {}));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
        this.deleteAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userUtils.updateAddress(req.query.id, { isDelete: "1" });
                return res
                    .status(200)
                    .json(responseBuilder_1.ResponseBuilder.successMessage(req.t("DELETE_ADDRESS"), {}));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
            }
        });
    }
}
exports.userController = userController;
//# sourceMappingURL=userController.js.map