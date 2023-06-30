const express = require("express");
const congViecRouter = express.Router();
const congViecController = require("../controllers/congviec.controller");
const { checkRole } = require('../helpers/checkRole.js');
const { verifyToken } = require('../helpers/verifyToken.js');


// congViecController.use(verifyToken);
congViecRouter.use(verifyToken);
// Retrieve all congviec
congViecRouter.get("/congviec", congViecController.findAll);

// Retrieve 1 congviec; id là mã công việc
congViecRouter.get("/congviec/:id", congViecController.findid);

// Create a new congviec; id là mã dự án
congViecRouter.post("/congviec/:id", checkRole(['director', 'manager']), congViecController.create);

// id là mã dự án
congViecRouter.post("/congviecfile/:id", checkRole(['director', 'manager']), congViecController.createFromFile);

// Retrieve a single congviec with id
congViecRouter.get("/timCongViec", congViecController.findOne);

// id là mã dự án
congViecRouter.get("/congviecbyduan/:id", congViecController.findByDuAn);

// Update a congviec with id
// id là mã công việc
congViecRouter.put("/congviec/:id", checkRole(['director', 'manager']), congViecController.update);

// Delete a congviec with id
// id là mã công việc
congViecRouter.delete("/congviec/:id", checkRole(['director', 'manager']), congViecController.deleteTT);

// Delete all congviec
// id là mã công việc
congViecRouter.delete("/xoaCongViecVinhVien/:id", checkRole(['director', 'manager']), congViecController.deleteVV);

// Phân công công việc và tải lên tệp tin
// id là mã công việc
congViecRouter.post("/congviec/phanCongCongViec/:id", checkRole(['director', 'manager']), congViecController.phanCongCongViec);

// Sửa phân công công việc và tải lên tệp tin
// id là mã công việc
congViecRouter.put("/congviec/editPhanCongCongViec/:id", checkRole(['director', 'manager']), congViecController.editPhanCongCongViec);


// Retrieve 1 congviec; id là mã công việc
congViecRouter.get("/nguoidungbycongviec/:id", congViecController.findNguoiDungByCongViec);


// Retrieve 1 congviec; id là mã công việc
congViecRouter.get("/tailieubycongviec/:id", congViecController.findTaiLieuByCongViec);




// Retrieve 1 congviec; id là mã công việc
congViecRouter.get("/detailCongViec/:id", congViecController.detailCongViec);

module.exports = congViecRouter;



