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
        while (_) try {
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
var fs_1 = require("fs");
var commander_1 = require("commander");
var package_json_1 = __importDefault(require("../package.json"));
var config_1 = require("./config");
var goals_1 = require("./goals");
var rimraf_1 = require("rimraf");
var logger_1 = require("./utils/logger");
var main = commander_1.program
    .name(package_json_1.default.version)
    .description(package_json_1.default.description)
    .version(package_json_1.default.version);
var build = main.command('build')
    .description('Builds for web and PWA')
    .option('--config <path>', 'configuration file to use', './bloomConfig.json')
    .option('-c, --clean', 'delete the output directory before building')
    .option('-p, --production', 'build without sourcemaps', false)
    .option('-o, --out <path>', 'the directory to output to', 'web')
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var config, l;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = (0, config_1.resolve)(options);
                l = (0, logger_1.createLogger)('clean');
                if (options.clean && (0, fs_1.existsSync)(options.out)) {
                    l.info('Cleaning last build...', '🧹');
                    (0, rimraf_1.sync)(options.out);
                    l.info('Done!', '✨');
                }
                l = (0, logger_1.createLogger)();
                l.info('Building PWA...', '🌷');
                return [4 /*yield*/, (0, goals_1.PWA)(l, config)];
            case 1:
                _a.sent();
                l.info('Done!', '🌸');
                return [2 /*return*/];
        }
    });
}); });
commander_1.program.parse(process.argv);
commander_1.program.exitOverride(function (err) {
    console.log(err);
    process.exit(0);
});
