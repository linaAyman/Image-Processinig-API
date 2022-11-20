"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var fs_2 = require("fs");
var path_1 = __importDefault(require("path"));
var imageResize_1 = __importDefault(require("../../imageResize"));
var resize = express_1.default.Router();
resize.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, width, height, inPath, outPath, outFilename, existInPath, existOutPath, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                filename = req.query.filename;
                width = parseInt(String(req.query.width));
                height = parseInt(String(req.query.height));
                inPath = path_1.default.resolve('./') + "/assets/images/original/".concat(filename, ".jpg");
                outPath = path_1.default.resolve('./') + '/assets/images/thumbnails/';
                outFilename = outPath + filename + '-(' + width + ',' + height + ').jpg';
                existInPath = (0, fs_2.existsSync)(inPath);
                existOutPath = (0, fs_2.existsSync)(outFilename);
                if (!!filename) return [3 /*break*/, 1];
                return [2 /*return*/, res
                        .status(400)
                        .send('<h2>Missing parameters, please use at least a valid filename query params in the url</h2>')];
            case 1:
                if (!(filename && !req.query.width && !req.query.height)) return [3 /*break*/, 2];
                //check if filename exists in originals folder
                if (!existInPath) {
                    return [2 /*return*/, res.status(404).send('<h2>NO image Found with that name...</h2>')];
                }
                else {
                    return [2 /*return*/, res.status(200).sendFile(inPath)];
                }
                return [3 /*break*/, 10];
            case 2:
                if (!(filename && req.query.width && req.query.height)) return [3 /*break*/, 9];
                //check if filename exists in originals folder
                if (!existInPath) {
                    return [2 /*return*/, res.status(404).send('<h2>NO image Found with that name...</h2>')];
                }
                //check on width and height validity
                if (width < 1 ||
                    Number.isNaN(width) ||
                    height < 1 ||
                    Number.isNaN(height)) {
                    return [2 /*return*/, res
                            .status(400)
                            .send('<h2>Value for width/height must be a positive nuber...</h2>')];
                }
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, fs_1.promises.access(outPath)];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = _b.sent();
                fs_1.promises.mkdir(outPath);
                return [3 /*break*/, 6];
            case 6:
                if (!!existOutPath) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, imageResize_1.default)(inPath, outFilename, width, height)];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: 
            //return the thumb
            return [2 /*return*/, res.status(200).sendFile(outFilename)];
            case 9: return [2 /*return*/, res
                    .status(400)
                    .send('<h2>Missing parameters, please insert both width and height</h2>')];
            case 10: return [2 /*return*/];
        }
    });
}); });
exports.default = resize;
