"use strict";
// From http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
exports.default = app;
//# sourceMappingURL=app.js.map