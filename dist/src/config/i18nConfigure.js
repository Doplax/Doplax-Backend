"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("i18n");
const node_path_1 = require("node:path");
i18n_1.default.configure({
    locales: ["en", "es"],
    directory: node_path_1.default.join(__dirname, "..", "locales"),
    defaultLocale: "en",
    autoReload: true,
    syncFiles: true,
    cookie: "nodeapp-locale",
});
i18n_1.default.setLocale("en");
exports.default = i18n_1.default;
//# sourceMappingURL=i18nConfigure.js.map