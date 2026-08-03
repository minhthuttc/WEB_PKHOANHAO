-- Tạo database
CREATE DATABASE EmployeeManagement;
GO

USE EmployeeManagement;
GO

-- Bảng nhân viên
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
GO

-- Insert dữ liệu mẫu
INSERT INTO Employees (FullName, Email, Phone, Department, Position, Salary, HireDate)
VALUES 
('Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', N'Kỹ thuật', N'Kỹ sư', 15000000, '2023-01-15'),
('Trần Thị B', 'tranthib@example.com', '0912345678', N'Nhân sự', N'Trưởng phòng', 20000000, '2022-06-20'),
('Lê Văn C', 'levanc@example.com', '0923456789', N'Kinh doanh', N'Nhân viên', 12000000, '2024-03-10');
GO
