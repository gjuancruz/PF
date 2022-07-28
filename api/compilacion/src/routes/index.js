"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = __importDefault(require("./movies"));
const auth_1 = __importDefault(require("./auth"));
const comments_1 = __importDefault(require("./comments"));
const feedback_1 = __importDefault(require("./feedback"));
const admin_1 = __importDefault(require("./admin"));
const show_1 = __importDefault(require("./show"));
const candy_1 = __importDefault(require("./candy"));
const tickets_1 = __importDefault(require("./tickets"));
const cart_1 = __importDefault(require("./cart"));
<<<<<<< HEAD
const sale_1 = __importDefault(require("./sale"));
=======
>>>>>>> c3c62ef8af72c1a6ca0df47e0f810f10330c137d
const router = (0, express_1.Router)();
router.use('/movies', movies_1.default);
router.use('/auth', auth_1.default);
router.use('/comments', comments_1.default);
router.use('/feedback', feedback_1.default);
router.use('/admin', admin_1.default);
router.use('/show', show_1.default);
router.use('/candy', candy_1.default);
router.use('/tickets', tickets_1.default);
router.use('/cart', cart_1.default);
<<<<<<< HEAD
router.use('/sale', sale_1.default);
=======
// router.use('/sale',sale)
>>>>>>> c3c62ef8af72c1a6ca0df47e0f810f10330c137d
exports.default = router;
//# sourceMappingURL=index.js.map