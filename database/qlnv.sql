-- Script tạo lại bảng nhân viên và dữ liệu mẫu

-- Đóng tất cả kết nối đến database QLNV (trừ kết nối hiện tại)
USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'QLNV')
BEGIN
    ALTER DATABASE QLNV SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    ALTER DATABASE QLNV SET MULTI_USER;
    PRINT 'Đã đóng tất cả kết nối khác đến database QLNV';
END
GO

-- Chuyển sang database QLNV
USE QLNV;
GO

-- Xóa bảng cũ nếu tồn tại
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'NhanVien')
BEGIN
    DROP TABLE NhanVien;
    PRINT 'Đã xóa bảng NhanVien cũ';
END
GO

-- Tạo bảng mới
CREATE TABLE NhanVien (
    STT INT PRIMARY KEY IDENTITY(1,1),
    MaNV NVARCHAR(20) UNIQUE NOT NULL,
    HoTen NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(200),
    SDT NVARCHAR(20),
    PhanLoaiSK NVARCHAR(50),
    NgayTao DATETIME DEFAULT GETDATE(),
    NgayCapNhat DATETIME DEFAULT GETDATE()
);
GO

PRINT 'Đã tạo bảng NhanVien mới';
GO

-- Thêm dữ liệu mẫu
INSERT INTO NhanVien (MaNV, HoTen, DiaChi, SDT, PhanLoaiSK)
VALUES 
(N'NV001', N'Nguyễn Văn A', N'123 Nguyễn Trãi, Quận 1, TP.HCM', '0901234567', N'Loại 1'),
(N'NV002', N'Trần Thị B', N'456 Lê Lợi, Quận 3, TP.HCM', '0912345678', N'Loại 2'),
(N'NV003', N'Lê Văn C', N'789 Hai Bà Trưng, Quận 5, TP.HCM', '0923456789', N'Loại 1'),
(N'NV004', N'Phạm Thị D', N'321 Điện Biên Phủ, Bình Thạnh, TP.HCM', '0934567890', N'Loại 3'),
(N'NV005', N'Hoàng Văn E', N'654 Võ Văn Tần, Quận 3, TP.HCM', '0945678901', N'Loại 1');
GO

PRINT 'Đã thêm 5 nhân viên mẫu';
GO

-- Kiểm tra dữ liệu
SELECT 
    STT,
    MaNV,
    HoTen,
    DiaChi,
    SDT,
    PhanLoaiSK,
    CONVERT(VARCHAR, NgayTao, 120) AS NgayTao,
    CONVERT(VARCHAR, NgayCapNhat, 120) AS NgayCapNhat
FROM NhanVien
ORDER BY STT;
GO

PRINT 'Hoàn thành!';
GO
