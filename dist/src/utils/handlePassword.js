"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
const encrypt = async (passwordPlain) => {
    const salt = 10;
    const hash = await bcryptjs_1.default.hash(passwordPlain, salt);
    return hash;
};
exports.encrypt = encrypt;
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs_1.default.compare(passwordPlain, hashPassword);
};
exports.compare = compare;
//# sourceMappingURL=handlePassword.js.map