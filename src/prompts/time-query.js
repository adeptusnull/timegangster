"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeQueryPrompt = void 0;
var zod_1 = require("zod");
exports.timeQueryPrompt = {
    name: "time-query",
    schema: {
        query: zod_1.z.string(),
        timezone: zod_1.z.string().optional()
    },
    handler: function (_a) {
        var query = _a.query, timezone = _a.timezone;
        return ({
            messages: [{
                    role: "user",
                    content: {
                        type: "text",
                        text: "Please help me with this time-related query: \"".concat(query, "\"").concat(timezone ? " in the timezone ".concat(timezone) : "", ".")
                    }
                }]
        });
    }
};
