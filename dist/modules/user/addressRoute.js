"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../validate");
const userController_1 = require("./userController");
const router = express_1.Router();
const v = new validate_1.Validator();
const UserController = new userController_1.userController();
router.post("/", UserController.addressAdd);
router.get("/", UserController.addressGet);
exports.addressRoute = router;
//# sourceMappingURL=addressRoute.js.map