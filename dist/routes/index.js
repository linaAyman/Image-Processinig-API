"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./api/resize"));
var routes = express_1.default.Router();
routes.use('/resize', resize_1.default);
routes.get('/', function (req, res) {
    res.send('<h1>Hello! This is an image processing api. Please use query with filename only (no resize) or filename with width and height (to resize)</h1>' +
        '<h2>Available Filenames: [encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica]</h2>' +
        '<h3>Example: localhost:300/api/resize?filename=santamonica -->No Resize</h3>' +
        '<h3>OR: localhost:300/api/resize?filename=santamonica&width=100&height=50 -->Resize</h3>');
});
exports.default = routes;
