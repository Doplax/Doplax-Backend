"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const changeLocaleController_1 = require("./changeLocaleController");
const router = express_1.default.Router();
router.get("/:locale", changeLocaleController_1.default);
exports.default = router;
//# sourceMappingURL=changeLocale.route.js.map