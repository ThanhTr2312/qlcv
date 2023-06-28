const express = require("express");
const router = express.Router();
const congViecController = require("../controllers/congviec.controller");
const { checkRole } = require('../helpers/checkRole.js');
const { verifyToken } = require('../helpers/verifyToken.js');

congViecController.use(verifyToken);

// Retrieve all congviec
router.get("/congviec", congViecController.findAll);

// Retrieve 1 congviec; id là mã công việc
router.get("/congviec/:id", congViecController.findid);

// Create a new congviec; id là mã dự án
router.post("/congviec/:id", congViecController.create);

// id là mã dự án
router.post("/congviecfile/:id", congViecController.createFromFile);

// Retrieve a single congviec with id
router.get("/timCongViec", congViecController.findOne);

// id là mã dự án
router.get("/congviecbyduan/:id", congViecController.findByDuAn);

// Update a congviec with id
// id là mã công việc
router.put("/congviec/:id", congViecController.update);

// Delete a congviec with id
// id là mã công việc
router.delete("/congviec/:id", congViecController.delete);

// Delete all congviec
// id là mã công việc
router.delete("/xoaCongViecVinhVien/:id", congViecController.deleteVV);

// Phân công công việc và tải lên tệp tin
// id là mã công việc
router.post("/congviec/phanCongCongViec/:id", congViecController.phanCongCongViec);

// Sửa phân công công việc và tải lên tệp tin
// id là mã công việc
router.put("/congviec/editPhanCongCongViec/:id", congViecController.editPhanCongCongViec);


// Retrieve 1 congviec; id là mã công việc
router.get("/nguoidungbycongviec/:id", congViecController.findNguoiDungByCongViec);


// Retrieve 1 congviec; id là mã công việc
router.get("/tailieubycongviec/:id", congViecController.findTaiLieuByCongViec);

module.exports = router;