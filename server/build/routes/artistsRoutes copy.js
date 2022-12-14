"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artistsController_1 = __importDefault(require("../controllers/artistsController"));
const multer_1 = __importDefault(require("../libs/multer"));
const productsController_1 = __importDefault(require("../controllers/productsController"));
class ArtistsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", artistsController_1.default.list);
        this.router.get("/productos/:id", productsController_1.default.getProductsByArtist);
        this.router.get("/:id", artistsController_1.default.getOne);
        this.router.post('/', multer_1.default.single('img'), artistsController_1.default.create);
        this.router.put('/:id', multer_1.default.single('img'), artistsController_1.default.update);
        this.router.delete('/:id', artistsController_1.default.delete);
    }
}
const artistRoutes = new ArtistsRoutes();
exports.default = artistRoutes.router;
