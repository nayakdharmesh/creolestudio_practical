import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import * as sql from "jm-ez-mysql";
import { Tables } from "../../config/tables";
import { userUtils } from "./userUtils";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Constants } from "../../config/constants";

export class UserMiddleware {
  private userUtils: userUtils = new userUtils();

  public isCheckEmailAddress = async (
    req: any,
    res: Response,
    next: () => void
  ) => {
    if (req.body.email) {
      const user = await sql.first(Tables.CUSTOMER, ["*"], "email = ? AND isActive = '1'", [
        req.body.email,
      ]);
      if (user && user.id) {
        next();
      } else {
        return res
          .status(Constants.UNAUTHORIZED_CODE)
          .json(
            ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST_SYSTEM"))
          );
      }
    } else {
      return res
        .status(Constants.UNAUTHORIZED_CODE)
        .json(ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST_SYSTEM")));
    }
  };

  public checkCredentials = async (
    req: any,
    res: Response,
    next: () => void
  ) => {
    const user: ResponseBuilder = await this.userUtils.getUserDetailByEmail(
      req.body.email
    );
    // check credentials matches or not
    if (
      user &&
      user.result &&
      user.result.id &&
      (await bcryptjs.compare(req.body.password, user.result.password))
    ) {
      req.body._user = user.result;
      next();
    } else {
      return res
        .status(Constants.UNAUTHORIZED_CODE)
        .json(ResponseBuilder.badRequest(req.t("INVALID_CREDENTIALS")));
    }
  };

  public oldAndNewPasswordCheck = async (
    req: any,
    res: Response,
    next: () => void
  ) => {
    const user: ResponseBuilder = await this.userUtils.getUserDetailById(
      req.body._user.id
    );
    // check credentials matches or not
    if (
      user &&
      user.result &&
      user.result.id &&
      (await bcryptjs.compare(req.body.oldPassword, user.result.password))
    ) {
      next();
    } else {
      return res
        .status(Constants.UNAUTHORIZED_CODE)
        .json(ResponseBuilder.badRequest(req.t("ERR_INVALID_PASSWORD")));
    }
  };
}
