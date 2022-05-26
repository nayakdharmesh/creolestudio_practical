import { Router } from "express";
import { Middleware } from "../../middleware";
import { Validator } from "../../validate";
import { userController } from "./userController";
import { UserMiddleware } from "./userMiddleware";
import {
  UserModel,
  LoginModel,
  UpdateUserModel,
  ChangePasswordModel,
} from "./userModel";
import * as path from "path";
import { addressRoute } from "./addressRoute";

const router: Router = Router();
const v: Validator = new Validator();
const UserController = new userController();
const userMiddleware = new UserMiddleware();
const middleware = new Middleware();
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

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },

  // mypic is the name of file attribute
});

router.post("/sign-up", v.validate(UserModel), UserController.signup);
router.post(
  "/login",
  v.validate(LoginModel),
  userMiddleware.isCheckEmailAddress,
  userMiddleware.checkCredentials,
  UserController.login
);
router.get("/profile", middleware.getUserAuthorized, UserController.profile);
router.post(
  "/update-profile-pic",
  middleware.getUserAuthorized,
  upload.single("mypic"),
  UserController.updateProfilePic
);
router.post(
  "/update-profile",
  middleware.getUserAuthorized,
  v.validate(UpdateUserModel),
  UserController.updateProfile
);
router.post(
  "/change-password",
  middleware.getUserAuthorized,
  v.validate(ChangePasswordModel),
  userMiddleware.oldAndNewPasswordCheck,
  UserController.changePassword
);
router.use("/address", middleware.getUserAuthorized, addressRoute);

export const customerRoute: Router = router;
