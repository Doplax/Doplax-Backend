"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../utils/errorHandler");
const handleJwt_1 = require("../../utils/handleJwt");
const User_model_1 = require("../wallapop/models/User.model");
const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            (0, errorHandler_1.default)(res, "ERROR_AUTHENTICATION: Missing authorization header.", 401);
            return;
        }
        const token = req.headers.authorization.split(" ").pop();
        if (!token) {
            (0, errorHandler_1.default)(res, "ERROR_TOKEN: No token provided.", 401);
            return;
        }
        const dataToken = await (0, handleJwt_1.verifyToken)(token);
        if (!dataToken) {
            (0, errorHandler_1.default)(res, "ERROR_TOKEN: The token is invalid or has expired.", 401);
            return;
        }
        const user = await User_model_1.default.findOne({ _id: dataToken._id });
        if (!user) {
            (0, errorHandler_1.default)(res, "ERROR_USER: No user associated with the provided token was found.", 404);
            return;
        }
        req.user = dataToken;
        next();
    }
    catch (e) {
        (0, errorHandler_1.default)(res, "ERROR_SESSION: Issue processing the session, possible server error or malformed token.", 401);
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map