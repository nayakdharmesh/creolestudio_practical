import { Request, Response } from "express";
import { Constants } from "../../config/constants";

import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Tables } from "../../config/tables";
import { userUtils } from "./userUtils";
import bcryptjs = require("bcryptjs");
import { Jwt } from "../../helpers/jwt";


export class userController {
  public userUtils = new userUtils();

  public signup = async (req: any, res: Response) => {
    try {
      req.body.password = bcryptjs.hashSync(
        req.body.password.toString(),
        Constants.PASSWORD_HASH
      );
      const result: ResponseBuilder = await this.userUtils.createUser(req.body);
      return res
        .status(result.code)
        .json(ResponseBuilder.successMessage(req.t("SIGNUP"), {}));
    } catch (error) {
      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public login = async (req: any, res: Response) => {
    try {
      const details = {
        token: Jwt.getAuthToken({
          userId: req.body._user.id,
          email: req.body._user.email,
        }),
        email: req.body._user.email,
      };

      return res
        .status(200)
        .json(
          ResponseBuilder.successMessage(req.t("MSG_USER_SIGN_IN"), details)
        );
    } catch (error) {
      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public profile = async (req: any, res: Response) => {
    try {
      const user = await this.userUtils.getUserDetailById(req.body._user.id);
      if (user.result && user.result.profilePic) {
        user.result.profilePic = `localhost:7000/uploads/${user.result.profilePic}`;
      }
      return res
        .status(200)
        .json(
          ResponseBuilder.successMessage(req.t("MSG_USER_SIGN_IN"), user.result)
        );
    } catch (error) {
      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public updateProfilePic = async (req: any, res: Response) => {
    try {
      console.log("req.file :", req.file);
      return res.status(200).json(
        ResponseBuilder.successMessage(req.t("PROFILE_PIC"), {
          data: req.file.filename,
        })
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public updateProfile = async (req: any, res: Response) => {
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
      await this.userUtils.updateById(req.body._user.id, reqObj);
      return res
        .status(200)
        .json(
          ResponseBuilder.successMessage(req.t("USER_UPDATED_SUCCESS"), {})
        );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public changePassword = async (req: any, res: Response) => {
    try {
      let { newPassword } = req.body;
      newPassword = bcryptjs.hashSync(
        newPassword.toString(),
        Constants.PASSWORD_HASH
      );
      await this.userUtils.updateById(req.body._user.id, {
        password: newPassword,
      });
      return res
        .status(200)
        .json(ResponseBuilder.successMessage(req.t("PASS_CHANGE"), {}));
    } catch (error) {
      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public addressAdd = async (req: any, res: Response) => {
    try {
      await Promise.all(
        (req.body.addressData = req.body.addressData.map((data) => {
          data.customerId = req.body._user.id;
          return data;
        }))
      );

      await this.userUtils.insertAddress(req.body.addressData);
      return res
        .status(200)
        .json(ResponseBuilder.successMessage(req.t("ADD_ADDRESS"), {}));
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };

  public addressGet = async (req: any, res: Response) => {
    try {
      const data = await this.userUtils.getAddress(req.body._user.id);
      return res
        .status(200)
        .json(
          ResponseBuilder.successMessage(req.t("ADD_ADDRESS"), data.result)
        );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };
  public updateAddress = async (req: any, res: Response) => {
    try {
      let { title, addressLine1, addressLine2, country, state, city, pincode } =
        req.body;
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

      await this.userUtils.updateAddress(req.query.id, updateData);
      return res
        .status(200)
        .json(ResponseBuilder.successMessage(req.t("UPDATE_ADDRESS"), {}));
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };
  public deleteAddress = async (req: any, res: Response) => {
    try {
      await this.userUtils.updateAddress(req.query.id, { isDelete: "1" });
      return res
        .status(200)
        .json(ResponseBuilder.successMessage(req.t("DELETE_ADDRESS"), {}));
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: req.t("ERR_INTERNAL_SERVER"), code: 500 });
    }
  };
}
