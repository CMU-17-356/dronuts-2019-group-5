"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = 3000;
const server = app_1.default.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = server;
//# sourceMappingURL=server.js.map