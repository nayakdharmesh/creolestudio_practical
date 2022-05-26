import * as _ from "lodash";
// import { Encrypt } from "./helpers/encrypt";
import { Jwt } from "./helpers/jwt";
import { Request, Response } from "express";
import * as l10n from "jm-ez-l10n";
import * as sql from "jm-ez-mysql";
import { Tables } from "./config/tables";

export class Middleware {
  public getUserAuthorized = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    const authorization = req.headers["x-auth-token"];
    if (authorization && !_.isEmpty(authorization)) {
      try {
        const tokenInfo = Jwt.decodeAuthToken(authorization.toString());
        if (tokenInfo) {
          const user = await sql.first(Tables.CUSTOMER, ["*"], "id = ?", [
            tokenInfo.userId,
          ]);
          if (user) {
            req.body._user = user;
            next();
          } else {
            res.status(401).json({ error: l10n.t("ERR_UNAUTH"), code: 401 });
            return;
          }
        } else {
          res.status(401).json({ error: l10n.t("ERR_UNAUTH"), code: 401 });
          return;
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: l10n.t("ERR_INTERNAL_SERVER"), code: 500 });
        return;
      }
    } else {
      res.status(401).json({ error: l10n.t("ERR_UNAUTH"), code: 401 });
      return;
    }
  };
}
