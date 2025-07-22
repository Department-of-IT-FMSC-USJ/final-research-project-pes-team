"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const express_validator_1 = require("express-validator");
const ValidateRequest = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.ValidateRequest = ValidateRequest;
//# sourceMappingURL=validatorRequest.js.map