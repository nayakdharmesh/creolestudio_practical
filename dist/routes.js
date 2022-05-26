"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const l10n = require("jm-ez-l10n");
const middleware_1 = require("./middleware");
const userRoute_1 = require("./modules/user/userRoute");
const express = require("express");
class Routes {
    constructor(NODE_ENV) {
        switch (NODE_ENV) {
            case "production":
                this.basePath = "/app/dist";
                break;
            case "development":
                this.basePath = "/app/public";
                break;
        }
    }
    defaultRoute(req, res) {
        res.json({
            message: "Hello !",
        });
    }
    path() {
        const router = express.Router();
        const middleware = new middleware_1.Middleware();
        router.use("/customer", userRoute_1.customerRoute);
        // router.use(middleware.authenticateServer);
        router.all("/*", (req, res) => {
            return res.status(404).json({
                error: l10n.t("ERR_URL_NOT_FOUND"),
            });
        });
        return router;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map