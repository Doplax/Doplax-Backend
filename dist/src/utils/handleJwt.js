"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.tokenSign = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const tokenSign = async (user) => {
    const sign = jsonwebtoken_1.default.sign({
        _id: user._id,
    }, JWT_SECRET, {
        expiresIn: "2h",
    });
    return sign;
};
exports.tokenSign = tokenSign;
const verifyToken = async (tokenJwt) => {
    try {
        return jsonwebtoken_1.default.verify(tokenJwt, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=handleJwt.js.map