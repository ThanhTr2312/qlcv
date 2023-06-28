const express = require("express");
const thongkeRouter = express.Router();
const thongkeController = require("../controllers/thongke.controller");

// Thống kê
thongkeRouter.get('/congviec/thongke', thongkeController.getTKCongViecTrangThai);
thongkeRouter.get('/congviec/uutien/thongke', thongkeController.getTKCongViecUuTien);
thongkeRouter.get('/nguoidung_congviec/thongke', thongkeController.getTKNDCongViecUuTien);
thongkeRouter.get('/nguoidung_congviec/trongthang/thongke', thongkeController.getTKNDCongViecTrongThang);

thongkeRouter.get('/nguoidung/thongke', thongkeController.getTKNguoiDung);

thongkeRouter.get('/duan/thongke', thongkeController.getTKDuAn);


module.exports = thongkeRouter;