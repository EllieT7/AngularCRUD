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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductsControllers {
    getProductsByArtistAndType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto WHERE artista_id_artista = ? AND tipo_producto_id_tp = ?', [req.params.id_artist, req.params.id_type]);
            res.json(products);
        });
    }
    getProductsByArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto WHERE artista_id_artista = ?', [req.params.id]);
            res.json(products);
        });
    }
    getProductsByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto WHERE tipo_producto_id_tp = ?', [req.params.id]);
            res.json(products);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto');
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]);
            if (products.length > 0) {
                return res.json(products[0]);
            }
            res.status(404).json({ text: 'el producto no existe' });
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, precio, artista_id_artista, tipo_producto_id_tp } = req.body;
            const newProduct = { nombre, descripcion, precio, img: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, artista_id_artista, tipo_producto_id_tp };
            yield database_1.default.query('INSERT INTO producto set ?', newProduct);
            res.json({ message: 'Producto guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM producto WHERE id_producto = ?', [req.params.id]);
            res.json({ message: 'El producto fue eliminado' });
        });
    }
    update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, precio, artista_id_artista, tipo_producto_id_tp } = req.body;
            var updatedProduct;
            if (((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) == undefined) {
                updatedProduct = { nombre, descripcion, precio, img: req.body.img, artista_id_artista, tipo_producto_id_tp };
            }
            else {
                updatedProduct = { nombre, descripcion, precio, img: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path, artista_id_artista, tipo_producto_id_tp };
            }
            yield database_1.default.query('UPDATE producto set ? WHERE id_producto = ?', [updatedProduct, req.params.id]);
            res.json({ message: 'El producto fue actualizado' });
        });
    }
}
const productsController = new ProductsControllers();
exports.default = productsController;
