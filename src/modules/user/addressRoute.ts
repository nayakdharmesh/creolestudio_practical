import { Router } from "express";
import { Validator } from "../../validate";
import { userController } from "./userController";

const router: Router = Router();
const v: Validator = new Validator();
const UserController = new userController();

router.post("/", UserController.addressAdd);
router.get("/", UserController.addressGet);
router.post("/update", UserController.updateAddress);
router.delete("/", UserController.deleteAddress);



export const addressRoute: Router = router;
