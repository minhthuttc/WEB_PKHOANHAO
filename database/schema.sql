-- Tạo database
CREATE DATABASE QuanLyNhanVien;
GO

USE QuanLyNhanVien;
GO

-- Bảng nhân viên
CREATE TABLE NhanVien (
    MaNV INT PRIMARY KEY IDENTITY(1,1),
    HoTen NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    SoDienThoai NVARCHAR(20),
    PhongBan NVARCHAR(50),
    ChucVu NVARCHAR(50),
    Luong DECIMAL(10, 2),
    NgayVaoLam DATE NOT NULL,
    TrangThai NVARCHAR(20) DEFAULT N'Đang làm',
    NgayTao DATETIME DEFAULT GETDATE(),
    NgayCapNhat DATETIME DEFAULT GETDATE()
);
GO

-- Insert dữ liệu mẫu
INSERT INTO NhanVien (HoTen, Email, SoDienThoai, PhongBan, ChucVu, Luong, NgayVaoLam)
VALUES 
(N'Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', N'Kỹ thuật', N'Kỹ sư', 15000000, '2023-01-15'),
(N'Trần Thị B', 'tranthib@example.com', '0912345678', N'Nhân sự', N'Trưởng phòng', 20000000, '2022-06-20'),
(N'Lê Văn C', 'levanc@example.com', '0923456789', N'Kinh doanh', N'Nhân viên', 12000000, '2024-03-10');
GO
