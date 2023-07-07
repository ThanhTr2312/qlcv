const express = require("express");
const thongkeRouter = express.Router();
const thongkeController = require("../controllers/thongke.controller");
const { checkRole } = require('../helpers/checkRole.js');
const { verifyToken } = require('../helpers/verifyToken.js');

// Thống kê
thongkeRouter.use(verifyToken);

thongkeRouter.get('/congviec/thongke',  checkRole(['director', 'manager']), thongkeController.getTKCongViecTrangThai);
thongkeRouter.get('/congviec/uutien/thongke',  checkRole(['director', 'manager']), thongkeController.getTKCongViecUuTien);
thongkeRouter.get('/nguoidung_congviec/thongke',  checkRole(['director', 'manager']), thongkeController.getTKNDCongViecUuTien);
thongkeRouter.get('/nguoidung_congviec/trongthang/thongke',  checkRole(['director', 'manager']), thongkeController.getTKNDCongViecTrongThang);

thongkeRouter.get('/nguoidung/thongke',  checkRole(['director', 'manager']), thongkeController.getTKNguoiDung);

thongkeRouter.get('/duan/thongke',  checkRole(['director', 'manager']), thongkeController.getTKDuAn);


module.exports = thongkeRouter;
