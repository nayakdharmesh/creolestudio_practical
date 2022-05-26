"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const validate_1 = require("../../validate");
const userController_1 = require("./userController");
const userMiddleware_1 = require("./userMiddleware");
const userModel_1 = require("./userModel");
const path = require("path");
const addressRoute_1 = require("./addressRoute");
const router = express_1.Router();
const v = new validate_1.Validator();
const UserController = new userController_1.userController();
const userMiddleware = new userMiddleware_1.UserMiddleware();
const middleware = new middleware_1.Middleware();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});
const maxSize = 1 * 1000 * 1000;
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the " +
            "following filetypes - " +
            filetypes);
    },
});
router.post("/sign-up", v.validate(userModel_1.UserModel), UserController.signup);
router.post("/login", v.validate(userModel_1.LoginModel), userMiddleware.isCheckEmailAddress, userMiddleware.checkCredentials, UserController.login);
router.get("/profile", middleware.getUserAuthorized, UserController.profile);
router.post("/update-profile-pic", middleware.getUserAuthorized, upload.single("mypic"), UserController.updateProfilePic);
router.post("/update-profile", middleware.getUserAuthorized, v.validate(userModel_1.UpdateUserModel), UserController.updateProfile);
router.post("/change-password", middleware.getUserAuthorized, v.validate(userModel_1.ChangePasswordModel), userMiddleware.oldAndNewPasswordCheck, UserController.changePassword);
router.use("/address", middleware.getUserAuthorized, addressRoute_1.addressRoute);
exports.customerRoute = router;
//# sourceMappingURL=userRoute.js.map