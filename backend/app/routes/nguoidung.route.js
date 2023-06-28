const express = require("express");
const nguoidungRouter = express.Router();
const nguoidungController = require('../controllers/nguoidung.controller');
const { checkRole } = require('../helpers/checkRole.js');
const { verifyToken } = require('../helpers/verifyToken.js');

nguoidungRouter.use(verifyToken);
nguoidungRouter.get('/nguoidung', checkRole(['director', 'manager']), nguoidungController.getAllNguoiDung);
nguoidungRouter.put('/nguoidung/:id', nguoidungController.putNguoiDung);
nguoidungRouter.post('/nguoidung', checkRole(['director', 'manager']), nguoidungController.postNguoiDung);
nguoidungRouter.delete('/nguoidung/:id', checkRole(['director', 'manager']), nguoidungController.deleteNguoiDung);
nguoidungRouter.get('/nguoidung/search', checkRole(['director', 'manager']), nguoidungController.searchNguoiDung);
nguoidungRouter.get('/nguoidung/:id', nguoidungController.getNguoiDung);

module.exports = nguoidungRouter;