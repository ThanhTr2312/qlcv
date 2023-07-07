const express = require("express");
const duanRouter = express.Router();
const duanController = require('../controllers/duan.controller');
const { checkRole } = require('../helpers/checkRole.js');
const { verifyToken } = require('../helpers/verifyToken.js');

duanRouter.use(verifyToken);
//Thêm dự án
duanRouter.post('/duan',  checkRole(['director', 'manager']), duanController.postDuAn);
//Xóa dự án
duanRouter.delete('/duan/:id',  checkRole(['director', 'manager']), duanController.deleteDuAn);
//lấy hết dự án
duanRouter.get('/duan', checkRole(['director', 'manager']), duanController.getAllDuAn);
//sửa dự án
duanRouter.put('/duan/:id', checkRole(['director', 'manager']), duanController.putDuAn);
//Tìm dự án theo id, phương thức GET
duanRouter.get('/duan/:id', checkRole(['director', 'manager']), duanController.getDuAn);

module.exports = duanRouter;
