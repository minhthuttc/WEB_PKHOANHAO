-- Chạy script này trong SQL Server Management Studio (SSMS)

-- Kiểm tra và tạo database nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'EmployeeManagement')
BEGIN
    CREATE DATABASE EmployeeManagement;
    PRINT 'Database EmployeeManagement đã được tạo!';
END
ELSE
BEGIN
    PRINT 'Database EmployeeManagement đã tồn tại!';
END
GO

USE EmployeeManagement;
GO

-- Kiểm tra và tạo bảng nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Employees')
BEGIN
    CREATE TABLE Employees (
        EmployeeID INT PRIMARY KEY IDENTITY(1,1),
        FullName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(100) UNIQUE NOT NULL,
        Phone NVARCHAR(20),
        Department NVARCHAR(50),
        Position NVARCHAR(50),
        Salary DECIMAL(10, 2),
        HireDate DATE NOT NULL,
        Status NVARCHAR(20) DEFAULT 'Active',
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
    PRINT 'Bảng Employees đã được tạo!';
END
ELSE
BEGIN
    PRINT 'Bảng Employees đã tồn tại!';
END
GO

-- Kiểm tra và thêm dữ liệu mẫu
IF NOT EXISTS (SELECT * FROM Employees)
BEGIN
    INSERT INTO Employees (FullName, Email, Phone, Department, Position, Salary, HireDate)
    VALUES 
    (N'Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', N'Kỹ thuật', N'Kỹ sư', 15000000, '2023-01-15'),
    (N'Trần Thị B', 'tranthib@example.com', '0912345678', N'Nhân sự', N'Trưởng phòng', 20000000, '2022-06-20'),
    (N'Lê Văn C', 'levanc@example.com', '0923456789', N'Kinh doanh', N'Nhân viên', 12000000, '2024-03-10'),
    (N'Phạm Thị D', 'phamthid@example.com', '0934567890', N'Marketing', N'Nhân viên', 13000000, '2023-08-20'),
    (N'Hoàng Văn E', 'hoangvane@example.com', '0945678901', N'Kỹ thuật', N'Trưởng phòng', 25000000, '2021-03-10');
    
    PRINT 'Đã thêm dữ liệu mẫu!';
END
ELSE
BEGIN
    PRINT 'Bảng đã có dữ liệu!';
END
GO

-- Hiển thị tất cả nhân viên
SELECT * FROM Employees;
GO
