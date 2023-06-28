CREATE TABLE `congviec` (
  `MaCongViec` varchar(255) PRIMARY KEY NOT NULL,
  `TenCongViec` varchar(255) NOT NULL,
  `MoTaCongViec` varchar(255) DEFAULT NULL,
  `NgayBatDau` date DEFAULT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `TrangThai` int(11) DEFAULT NULL,
  `UuTien` int(11) DEFAULT NULL,
  `MaDuAn` varchar(255) DEFAULT NULL
);

CREATE TABLE `congviec_tailieucv` (
  `MaCV_TL` varchar(255) PRIMARY KEY NOT NULL,
  `MaCongViec` varchar(255) DEFAULT NULL,
  `MaTaiLieuCV` varchar(255) DEFAULT NULL
);

CREATE TABLE `duan` (
  `MaDuAn` varchar(255) PRIMARY KEY NOT NULL,
  `TenDuAn` varchar(255) NOT NULL,
  `MoTaDuAn` varchar(255) DEFAULT NULL,
  `NgayBatDau` date DEFAULT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `TrangThai` int(11) DEFAULT NULL
);

CREATE TABLE `nguoidung` (
  `MaNguoiDung` varchar(255) PRIMARY KEY NOT NULL,
  `HoLot` varchar(255) NOT NULL,
  `Ten` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(10) DEFAULT NULL,
  `ViTri` varchar(255) DEFAULT NULL,
  `GioiTinh` tinyint(1) DEFAULT NULL,
  `TrangThai` int(11) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `MaLoaiNguoiDung` varchar(255) DEFAULT NULL
);

CREATE TABLE `loainguoidung` (
  `MaLoaiNguoiDung` varchar(255) PRIMARY KEY NOT NULL,
  `TenLoaiNguoiDung` varchar(255) NOT NULL
);

CREATE TABLE `nguoidung_congviec` (
  `MaND_CV` varchar(255) PRIMARY KEY NOT NULL,
  `MaNguoiDung` varchar(255) DEFAULT NULL,
  `MaCongViec` varchar(255) DEFAULT NULL,
  `TrangThai` int(11) DEFAULT NULL
);


CREATE TABLE `nhomthaoluan` (
  `MaNhomThaoLuan` varchar(255) PRIMARY KEY NOT NULL,
  `TenNhomThaoLuan` varchar(255) NOT NULL
);

CREATE TABLE `tailieu` (
  `MaTaiLieu` varchar(255) PRIMARY KEY NOT NULL,
  `TenTaiLieu` varchar(255) NOT NULL,
  `MaDuAn` varchar(255) DEFAULT NULL
);

CREATE TABLE `tailieucv` (
  `MaTaiLieuCV` varchar(255) PRIMARY KEY NOT NULL,
  `TenTaiLieuCV` varchar(255) NOT NULL
);

CREATE TABLE `tinnhan` (
  `MaTinNhan` varchar(255) PRIMARY KEY NOT NULL,
  `NoiDung` varchar(255) NOT NULL,
  `NgayTao` varchar(255) DEFAULT NULL,
  `MaNhomThaoLuan` varchar(255) DEFAULT NULL,
  `MaNguoiDung` varchar(255) DEFAULT NULL
);

ALTER TABLE `congviec` ADD CONSTRAINT `FK_CongViec_congviec_duan` FOREIGN KEY (`Macongviec_duan`) REFERENCES `congviec_duan` (`Macongviec_duan`);

ALTER TABLE `congviec_tailieucv` ADD CONSTRAINT `FK_CongViec_TaiLieuCV` FOREIGN KEY (`MaCongViec`) REFERENCES `congviec` (`MaCongViec`);

ALTER TABLE `congviec_tailieucv` ADD CONSTRAINT `FK_CongViecTaiLieuCV_TaiLieuCV` FOREIGN KEY (`MaTaiLieuCV`) REFERENCES `tailieucv` (`MaTaiLieuCV`);

ALTER TABLE `nguoidung` ADD CONSTRAINT `FK_NguoiDung_LoaiNguoiDung` FOREIGN KEY (`MaLoaiNguoiDung`) REFERENCES `loainguoidung` (`MaLoaiNguoiDung`);

ALTER TABLE `nguoidung_congviec` ADD CONSTRAINT `FK_NguoiDung_CongViec` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`);

ALTER TABLE `nguoidung_congviec` ADD CONSTRAINT `FK_CongViec_NguoiDung` FOREIGN KEY (`MaCongViec`) REFERENCES `congviec` (`MaCongViec`);

ALTER TABLE `congviec` ADD CONSTRAINT `FK_congviec_duan` FOREIGN KEY (`MaDuAn`) REFERENCES `duan` (`MaDuAn`);

ALTER TABLE `tailieu` ADD CONSTRAINT `FK_TaiLieu_DuAn` FOREIGN KEY (`MaDuAn`) REFERENCES `duan` (`MaDuAn`);

ALTER TABLE `tinnhan` ADD CONSTRAINT `FK_TinNhan_NhomThaoLuan` FOREIGN KEY (`MaNhomThaoLuan`) REFERENCES `nhomthaoluan` (`MaNhomThaoLuan`);

ALTER TABLE `tinnhan` ADD CONSTRAINT `FK_TinNhan_NguoiDung` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`);
