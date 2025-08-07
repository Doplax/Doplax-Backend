"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleHttpError = (res, message = "Something happens...", code = 403) => {
    res.status(code).send(message);
};
exports.default = handleHttpError;
//# sourceMappingURL=errorHandler.js.map